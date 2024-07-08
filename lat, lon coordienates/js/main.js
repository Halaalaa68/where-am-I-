/// <reference types="../@types/jquery" />

// let spinner= document.querySelector(".spinner")
// document.addEventListener('DOMContentLoaded', function(){
    
// })

$(function(){
    $(".spinner").fadeOut(1000)
})
$(".btn").on('click', function(){
    let lat=$('#lat').val()
    let lon=$("#lon").val()
    fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=668b172041567128535358nrl06216e`)
    .then(function(response){
        if(!response.ok)
            {
                throw new Error(`Please enter a real latitude and longitude values! (${response.status})`)
            }
        return response.json()
    })
    .then(function(data){
        // console.log(data)
        if(data.error)
        {
            throw new Error(`Please enter a real latitude and longitude values! ${data.error}`)
        }
        // let arr=data.display_name.split(",")
        else
        {
            let arr=[]
        let i=0
        for(let x in data.address)
        {
            if(x!="ISO3166-2-lvl4" && x!="country_code"){
                // console.log(x)
                arr[i]=x
                i++
            }
        }
        // console.log(arr)
        $(".city").html(`<h1>Where are you<span class="question">?</span></h1>`)
        arr.forEach(x => {
            let txt = document.createElement("h2");
            txt.innerHTML=`<span class="text-uppercase text-info ">${x}</span>: ${data.address[x]}`
            $(".city").append(txt)
            // $(".city").append(`${x}: ${data.address[x]}`)
            // $(".city").
        })
        }
        // $(".city").html(`You're in ${data.address}`)
    })
    .catch(err => 
    {
        // alert(err.code)
        // console.log(err.message)

        $(".city").html(`Something went wrong: ${err.message}. Try again!`)
    })
})

