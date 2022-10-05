
function mode()
{
        let element = document.body;
        element.classList.toggle("dark");
        const el = document.querySelector('.form-holder');
       

         if(element.classList == "dark")
       { 
         document.getElementById("btn").name = "bulb-outline" ;
         el.style.backgroundColor = 'white' ;
       }

        else
        {
        document.getElementById("btn").name = "bulb" ;
        el.style.backgroundColor = '#333B47' ;
        
        }
}

