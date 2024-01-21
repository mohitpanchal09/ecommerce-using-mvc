const likeButtons = document.querySelectorAll('#like-button')
async function like(productId,button){
    try{
        let response = await axios({
            method:'post',
            url:`/products/${productId}/like`,
            headers:{
                'X-Requested-With':'XMLHttpRequest'
            }
        })
        if(response.data=='liked'){
            console.log('liked')
            button.classList.remove('fa-regular')
            button.classList.add('fa-solid')

        }else{
            console.log('unliked')
            button.classList.remove('fa-solid')
            button.classList.add('fa-regular')
        }
    }catch(err){
        window.location.replace('/login')
    }

    
    
}

for(let button of likeButtons){
    button.addEventListener('click',()=>{
        let productID= button.getAttribute('data')
        like(productID,button)
    })
}