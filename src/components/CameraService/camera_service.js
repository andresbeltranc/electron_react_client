const Camera = require('./camera')

import { io } from "socket.io-client";


class CameraService{
    constructor(){
        this.state = 'created'
        this.videoDevices = []
        this.frontCamera
        this.socket
    }

    async getVideoDevices (){
        let vd = []
        const listVideoDevices = async (mediaDevices) =>{   
            mediaDevices.forEach(mediaDevice => {
                if (mediaDevice.kind === 'videoinput') {
                    vd.push({
                    deviceId: mediaDevice.deviceId,
                    label: mediaDevice.label
                })
                }
            })
            this.videoDevices = vd
        }
        await navigator.mediaDevices.enumerateDevices().then(listVideoDevices)
        return this.videoDevices
    }

    async startFrontCameraStream(id){
        this.frontCamera = new Camera(id)
        return this.frontCamera.startCamera()
    }

    startFrontCameraSocket(){
        const video = document.querySelector("#videoStream");
        video.srcObject = this.frontCamera.stream;
        video.play();

        function capture(video, scaleFactor) {
            if(scaleFactor == null){
                scaleFactor = 1;
            }
            var w = video.videoWidth * scaleFactor;
            var h = video.videoHeight * scaleFactor;
            var canvas = document.createElement('canvas');
                canvas.width  = w;
                canvas.height = h;
            var ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, w, h);
            return canvas;
        } 
        const sendFrame =()=> {
            let type = "image/webp"
            let frame = capture(video,1)
            let data = frame.toDataURL(type);
            return data
        }

        this.socket = io('http://localhost:4321',
        {path: '/ws/socket.io', transports: ['websocket', 'polling']});
        //console.log(this.socket)
        this.socket.on('connect', function(){
             console.log("Connected...!")
        });
        const FPS = 15;
        setInterval(() => {
            //console.log("entervalo")
            let frame = sendFrame()
            this.socket.emit('image', frame);
        }, 10000/FPS);

    }
}
let cameraService = new CameraService();
export default cameraService
//module.exports = cameraService;