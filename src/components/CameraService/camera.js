

class Camera{
    constructor(deviceId,deviceLabel){
        this.state = 'created'
        this.deviceId = deviceId
        this.deviceLabel = deviceLabel
        this.stream
    }

    async startCamera(){
        const constraints = {
            video: {deviceId:  this.deviceId, frameRate: { ideal: 10, max: 10}}
          };
          //console.log(tracks)
          if (this.stream != undefined){
            const tracks = this.stream.getTracks();
            tracks.forEach(function(track) {
              track.stop();
            });
          }
          this.stream = await navigator.mediaDevices.getUserMedia(constraints);
          //videoRef.current.srcObject = stream;
          this.state = 'running'
          return this.stream
    }
    closeCamera(){
        const tracks = this.stream.getTracks();
        console.log(tracks)
        tracks.forEach(function(track) {
          track.stop();
        });
        this.state = "close"
    }
    startService(){
        return startCamera(this.deviceId)
    }
}

module.exports = Camera;



