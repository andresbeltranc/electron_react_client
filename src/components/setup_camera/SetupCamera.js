import {React,useRef, useEffect,useState} from "react";
import './SetupCamera.css'
import Form from 'react-bootstrap/Form'
import cameraService from '../CameraService/camera_service'
import { io } from "socket.io-client";

const SetupCamera =(props)=>{
    const [videoInputs, setVideoInputs] = useState([]);
    let videoRef = useRef();
    let socket = io('http://localhost:4321',{path: '/ws/socket.io', transports: ['websocket', 'polling']});
    socket.on('connect', function(){
      console.log("Connected...!");
      socket.emit('engine_get_frame',"get_frame");
      socket.on('current_frame',function(current_frame){
        videoRef.current.srcObject = current_frame
      })
    });
    // will to call 
    useEffect(async () =>{
      const devices = await cameraService.getVideoDevices()
      setVideoInputs(devices)
    }, []);

    const defaulfVideoInput = async () =>{
      let selectorItems = videoInputs.map((device)=>{   
        return device.deviceId;
      })
      if(selectorItems.length > 0){
        let stream = await cameraService.startFrontCameraStream(selectorItems[0])
        videoRef.current.srcObject = stream;        
      }
    }

      function handleCanPlay() {
        videoRef.current.play();
      }

    const changeCameraShow = async () =>{
        console.log(event.target.value);
        if (cameraService.frontCamera.stream != undefined){
          const tracks = cameraService.frontCamera.stream.getTracks();
          tracks.forEach(function(track) {
            track.stop();
          });
          let stream = await cameraService.startFrontCameraStream(event.target.value)
          videoRef.current.srcObject = stream;
        }        
    }

    const getVideoDevices = () =>{
        console.log(typeof videoInputs)
        let selectorItems = videoInputs.map((device)=>{   
            return <option key={device.deviceId} value={device.deviceId}>{device.label}</option>;
        })
        return selectorItems
    }

    const onConfirmCamera = () =>{
      cameraService.startFrontCameraSocket();
     // props.history.push('/main/register_face')
    }
    defaulfVideoInput()

    return (
        <div className="">
            <h1 className="title">Setup Camera</h1>
            <div className = "camera_content">
                <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
            </div>
            <div className="select_content">
              <Form role="form">
                  <Form.Control as="select" onChange={changeCameraShow.bind(this)}>
                      {getVideoDevices()}
                  </Form.Control>
              </Form>
              <button onClick={onConfirmCamera.bind()} className="button_content">Confirm</button>
            </div>
        </div >
    );
};

//const formWrapped = reduxForm({form:'login_page',validate}) (LoginPage);

//export default connect(null,{login})(formWrapped);
export default SetupCamera;