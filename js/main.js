const FormButton = document.querySelector('.submitbutton');

FormButton.addEventListener('click', e => {
    e.preventDefault();
    const aliasInputField = document.querySelector('#alias'); 
    const textInput = document.querySelector('.newsletterForm input');
    const errorEl = document.querySelector('.error_isActiveText');
    const errorSV = document.querySelector('.server_error_isActiveText')
    const errorUl = document.querySelector('.url_error_isActiveText');
    const success = document.querySelector('.success_isActiveText');
    validate(FormButton, aliasInputField, textInput, errorEl, errorSV, errorUl, success);
  });

  const validate = async (buttonEl, aliasInput, inputField, errorField, errorSV, errorFieldAlias, successField) => {
    const re = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    const base_url = "https://frda.me/"
    if (inputField.value.length == 0) {
      inputField.classList.add('error_active');
      errorField.innerHTML = 'Provide a link';
      errorField.style.display = 'block';
      setTimeout(() => {
        inputField.classList.remove('error_active');
        errorField.innerHTML = '';
        errorField.style.display = 'none';
      }, 3000); 
    } else if (re.test(String(inputField.value).toLowerCase()) !== true) {
      inputField.classList.add('error_active');
      errorField.innerHTML = "Please provide a valid url";
      errorField.style.display = 'block';
      setTimeout(() => {
        inputField.classList.remove('error_active');
        errorField.innerHTML = '';
        errorField.style.display = 'none';
      }, 3000);
    } else {

      if ( aliasInput.value == null ) {
        _data = {
          original_url: inputField.value,
        }
        
      } else if ( aliasInput.value != " " ) {
         _data = {
          original_url: inputField.value,
          short_url: aliasInput.value,
        }
      }
      
      try {
        errorSV.style.display = 'none';
        successField.style.display = 'none'
        buttonEl.innerHTML = '';
        buttonEl.style.display = 'flex';
        buttonEl.style.justifyContent = 'center';
        buttonEl.style.alignItems = 'center';
        const newSpan = document.createElement('div');
        buttonEl.disabled = true;
        newSpan.classList.add('loader');
        buttonEl.appendChild(newSpan);


        const response = await fetch(
          'https://frda.me/api/shorten',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({original_url : inputField.value, short_url : aliasInput}),
          }
        );


        if (response.status == 500) {
          errorSV.style.display = 'block';
          errorField.style.display = 'none';
          newSpan.classList.remove('loader');
          buttonEl.disabled = false;
          buttonEl.innerHTML = 'Try again';
        } 
        
        else if (response.status == 400) {
          errorSV.style.display = 'block';
          errorSV.innerHTML = "Something went wrong, please contact admin"
          errorField.style.display = 'none';
          newSpan.classList.remove('loader');
          buttonEl.disabled = false;
          buttonEl.innerHTML = 'Try again';
        } 
        
        else if (response.status == 201) {

          // Storing data in form of JSON
          var returned_data = await response.json();
          console.log(returned_data);

          // inputField.value = '';
          successField.style.display = 'block'
          let r_link = returned_data.short_url
          let result = $('#success_isActiveText a');
          full_url = base_url + r_link
          result.attr('href', full_url)
          result.text(full_url)
          newSpan.classList.remove('loader');
          buttonEl.disabled = false;
          buttonEl.innerHTML = 'Perform another Faraday Magic';
        }
      } catch (e) {
        console.log(e)
        buttonEl.innerHTML = 'Request Access';
        buttonEl.disabled = false;
        errorField.innerHTML = 'Something went wrong, please try again';
      }
    }
  };
  