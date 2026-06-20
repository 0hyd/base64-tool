const buttonEncode = document.querySelector("#encode");
const buttonDecode = document.querySelector("#decode");
const encodeError = document.getElementById("encode-error");
const decodeError = document.getElementById("decode-error");

const txtareaBase64 = document.getElementById("input-base64");
const txtareaTxt = document.getElementById("input-txt");

buttonEncode.addEventListener("click", goEncode);
buttonDecode.addEventListener("click", goDecode);

txtareaBase64.addEventListener("input", goDecode);
txtareaTxt.addEventListener("input", goEncode);

let encodeTimer = null;
let decodeTimer = null;
let isUpdate = false;

function base64Encode(text) {
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(text);

    let binary = "";
    for (let i = 0; i < utf8Bytes.length; i++) {
        binary += String.fromCharCode(utf8Bytes[i]);
    }

    return btoa(binary);
}

function base64Decode(base64) {
    const binary = atob(base64);

    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    const decoder = new TextDecoder('utf-8', { fatal: true });
    return decoder.decode(bytes);
}

function goEncode()
{
    if (isUpdate) {
        return;
    }
    clearTimeout(encodeTimer);
    encodeTimer = setTimeout(() => { // encodeTimer 保存定时器ID，内部函数定时300ms后就执行
        isUpdate = true;
        try {
            const input = txtareaTxt.value;

            const text = base64Encode(input);
            txtareaBase64.value = text;
            encodeError.textContent = "";
            decodeError.textContent = "";
        } catch(e) {
            encodeError.textContent = "编码错误：" + e.message;
            txtareaBase64.value = "";
            decodeError.textContent = "";
            console.error(e.name);
            console.error(e.message);
        } finally {
            isUpdate = false;
        }
        
    }, 300);
}

function goDecode()
{
    if (isUpdate) {
        return;
    }
    clearTimeout(decodeTimer);
    decodeTimer = setTimeout(() => {
        isUpdate = true;
        try {
            const input = txtareaBase64.value;

            const text = base64Decode(input);
            txtareaTxt.value = text;
            encodeError.textContent = "";
            decodeError.textContent = "";
        } catch(e) {
            decodeError.textContent = "解码错误：" + e.message;;
            txtareaTxt.value = "";
            encodeError.textContent = "";
            console.error(e.name);
            console.error(e.message);
        } finally {
            isUpdate =false;
        }
    }, 300);
}