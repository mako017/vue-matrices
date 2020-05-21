import axios from "axios";

class COMM {
 static PHPDIR = "https://lets-test.it/matrices/assets/php/";

 static async sendData(data, code){
    let sendObj = {
        data,
        code
    }
    let response  = await axios.post(this.PHPDIR+"writeData.php", JSON.stringify(sendObj));
    console.log(response);
 }
}

export default COMM;