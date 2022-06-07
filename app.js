class SelManager {
    constructor({ trigger, selector, options, activeName }) {
        this.trigger = document.querySelector(trigger);
        this.sel = document.querySelector(selector);
        this.options = this.sel.querySelectorAll(options);
        this.active = activeName;
        this.addclickEvent();
    }
    addclickEvent() {
        this.trigger.addEventListener("click", (e) => { this.clickEvent(this, e) })
    }
    clickEvent(cls, e) {
        cls.trigger.classList.toggle(cls.active)
        cls.sel.classList.toggle(cls.active)
        cls.options.forEach((e) => {
            e.addEventListener("click", (e) => {
                cls.trigger.querySelector("span").innerText = e.target.innerText
                cls.trigger.classList.remove(cls.active)
                cls.sel.classList.remove(cls.active)
            });
        })
    }
}
let trs = new SelManager({
    trigger: ".select .parent",
    selector: ".select .options",
    options: ".option",
    activeName: "active"
});
let trs2 = new SelManager({
    trigger: ".select2 .parent",
    selector: ".select2 .options",
    options: ".option",
    activeName: "active"
});
//Keyword manager
class keyWordManager {
    constructor({form,pushlocation,element,span}){
        this.form=document.querySelector(form);
        this.pl=document.querySelector(pushlocation);
        this.elem=document.querySelector(element);
        this.target=span;
        this.observer();
    }
    observer(){
        this.form.addEventListener("submit",(e)=>{
            e.preventDefault();
            let val=e.target.querySelector("input");
            let newe=document.createElement("div")
            newe.classList=this.elem.classList
            newe.innerHTML=this.elem.innerHTML
            newe.querySelector("span").innerText=this.capitalise(val.value).substring(0,5);
            val.value=null
            this.pl.prepend(newe)
            this.pl.querySelectorAll(`.${this.elem.classList[0]} img`).forEach((e)=>{
                e.addEventListener("click",(e)=>{e.target.parentElement.remove()})
            })
        })
    }
    capitalise(s){
        return s.substring(0,1).toUpperCase() + s.slice(1);
    }
}
let keyman=new keyWordManager({
    form:"form",
    pushlocation:"form .wrapper",
    element:"form .wrapper .key",
    span:"span"
});

//Animation
let allAccents=document.querySelectorAll(".accent")
let observer=new IntersectionObserver((e)=>{
    if(!e[0].isIntersecting)return false;

    let allPaths=e[0].target.querySelectorAll("path")
    let delay=0;
    allPaths.forEach((ele)=>{
        delay+=50
        setTimeout(()=>{
            ele.style.transform="scale(1)";
        },delay)
    })
});
allAccents.forEach((acc)=>{
    observer.observe(acc);
})