const FormButton = document.querySelector('.submitbutton');

FormButton.addEventListener('click', e => {
    e.preventDefault();
    const aliasInputField = document.querySelector('#alias'); 
    const textInput = document.querySelector('.newsletterForm input');
    const errorEl = document.querySelector('.error_isActiveText');
    const errorUl = document.querySelector('.url_error_isActiveText');
    const success = document.querySelector('.success_isActiveText');
    validate(FormButton, aliasInputField, textInput, errorEl, errorUl, success);
  });

  const validate = async (buttonEl, aliasInput, inputField, errorField, errorFieldAlias, successField) => {
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

      let _data = {
        original_url: inputField.value,
        short_url: aliasInput.value,
      }

      try {
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
            body: JSON.stringify(_data),
          }
        );
        if (response.status == 500) {
          inputField.classList.add('error_active');
          errorField.innerHTML = 'Server internal error, contact admin and try again';
          errorField.style.display = 'block';
          setTimeout(() => {
            inputField.classList.remove('error_active');
            errorField.innerHTML = '';
            errorField.style.display = 'none';
            newSpan.classList.remove('loader');
            buttonEl.appendChild(newSpan);
            buttonEl.disabled = false;
          }, 3000);
        } else if (response.status == 201) {
          // inputField.value = '';
          successField.style.display = 'block'
          let r_link = `${response.original_url}`
          let result = $('#success_isActiveText a');
          full_url = base_url + r_link
          result.attr('href', full_url)
          result.text(full_url)
          newSpan.classList.remove('loader');
          buttonEl.appendChild(newSpan);
          buttonEl.disabled = false;
        }
      } catch (e) {
        console.log(e)
        buttonEl.innerHTML = 'Request Access';
        buttonEl.disabled = false;
        errorField.innerHTML = 'Something went wrong, please try again';
      }
    }
  };
  