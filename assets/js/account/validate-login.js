const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const p_alerts = $$('p.alert');
const inputs = $$('input');
inputs.forEach((item, index)=> {
    item.addEventListener('focus', ()=>{
        p_alerts[index].innerText = '';
    })
});

const form = $('form');
const submit_btn = $('button[type="submit"]');
const email = $('input[name="email"]');
const pass = $('input[name="pass"]');
let hasError = false;
const eye = $('.field-pass .eye');

function alertError(message, className) {
    $('.alert--'+className).innerText = message;
}

// function validateUserame(username) {
//     const rgxUsername = /^[a-zA-Z]+([ ]{1}[a-zA-Z]+)*$/;
//     return rgxUsername.test(username);
// }

function validateMail(mail) {
    const rgxMail = /^([a-zA-Z0-9-._])+[@]+[a-z]+[.]+[a-z]+([.]+[a-z]+)*$/;
    if(!mail){
        hasError = true;
        return alertError('Vui lòng nhập email', 'mail');;
    }
    if(!rgxMail.test(mail)){
        hasError = true;
        alertError('Email không đúng định dạng', 'mail');
    }
}

function validatePassword(pass) {
    const passlen = pass.length;
    if(passlen === 0){
        hasError = true;
        return alertError('Vui lòng nhập mật khẩu', 'pass');
    }
    if(passlen < 8){
        hasError = true;
        alertError('Mật khẩu ít nhất 8 ký tự', 'pass');
    }
}

submit_btn.onclick = (e)=> {
    e.preventDefault();
    validateMail(email.value);
    validatePassword(pass.value);
    if(!hasError){
        form.submit();
    }
    hasError = false;
}

let flag = 1;
eye.onclick = function(){
    let i = this.firstElementChild;
    let input_type = this.parentElement.firstElementChild;
    i.classList.toggle('fa-eye');
    i.classList.toggle('fa-eye-slash');
    input_type.setAttribute("type", `${ flag ? 'text' : 'password' }`);
    flag = !flag;
}