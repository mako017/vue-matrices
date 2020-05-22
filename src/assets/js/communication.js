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
 static async requestData(code){
    let sendObj = {
        data:0,
        code
    }
    let response  = await axios.post(this.PHPDIR+"readData.php", JSON.stringify(sendObj));
    return response.data;
 }
}

export default COMM;