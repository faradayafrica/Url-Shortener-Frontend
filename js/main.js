const FormButton = document.querySelector('.submitbutton');

FormButton.addEventListener('click', e => {
    e.preventDefault();
    const aliasInputField = document.querySelector('#alias'); 
    const textInput = document.querySelector('.newsletterForm input');
    const errorEl = document.querySelector('.error_isActiveText');
    const errorSV = document.querySelector('.server_error_isActiveText')
    const errorUl = document.querySelector('.url_error_isActiveText');
    const success = document.querySelector('.success_isActiveText');
    const checktoggle = document.querySelector('#checkboxtoggle');
    const toggletext = document.querySelector('#toggletext');
    validate(FormButton, aliasInputField, textInput, errorEl, errorSV, errorUl, success, checktoggle, toggletext);
  });

  const validate = async (buttonEl, aliasInput, inputField, errorField, errorSV, errorFieldAlias, successField, checkInput, toggletext) => {
    const re = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    const base_url = "https://frda.me/"
    if (checkInput.checked) {
      var checkInputValue = 1
      var toggletextvalue = toggletext.value
    } else {
      var checkInputValue = 0
      var toggletextvalue = ""
    }

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


        if ( !aliasInput.value ) {
        
          const response = await fetch(
            'https://frda.me/api/shorten/',
            {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*",
                "Access-Control-Allow-Headers":"*"
              },
              body: JSON.stringify({original_url : inputField.value, redirect : checkInputValue, page_info : toggletextvalue}),
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
  
            // inputField.value = '';
            successField.style.display = 'block'
            let r_link = returned_data.short_url
            let result = $('#success_isActiveText a');
            full_url = base_url + r_link
            result.attr('href', full_url)
            result.text(full_url)
            newSpan.classList.remove('loader');
            buttonEl.disabled = false;
            buttonEl.innerHTML = 'Create another magic link';
          }
          
        } else {
  
          const response = await fetch(
            'https://frda.me/api/shorten/',
            {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*",
                "Access-Control-Allow-Headers":"*"
              },
              body: JSON.stringify({original_url : inputField.value, short_url : aliasInput.value, redirect : checkInputValue, page_info : toggletextvalue}),
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
  
            // inputField.value = '';
            successField.style.display = 'block'
            let r_link = returned_data.short_url
            let result = $('#success_isActiveText a');
            full_url = base_url + r_link
            result.attr('href', full_url)
            result.text(full_url)
            newSpan.classList.remove('loader');
            buttonEl.disabled = false;
            buttonEl.innerHTML = 'Create another magic link';
          }
  
        }

      } catch (e) {
        console.log(e)
        buttonEl.innerHTML = 'Something went wrong, please try again';
        buttonEl.disabled = false;
        errorField.innerHTML = 'Something went wrong, please try again';
      }
    }
  };


// // get the text from the DOM Element: 
// const textToCopy = document.querySelector('.copy-text').innerText

// // when someone clicks on the <a class="copy-text"> element 
// // (which should be a <button>), execute the copy command:
// document.querySelector('.copy-button').addEventListener('click' , e => {
//   e.preventDefault();
//   navigator.clipboard.writeText(textToCopy).then(
//     function() {
//       /* clipboard successfully set */
//       window.alert('Success! The text was copied to your clipboard') 
//     }, 
//     function() {
//       /* clipboard write failed */
//       window.alert('Opps! Your browser does not support the Clipboard API')
//     }
//   )
// })

document.querySelector(".copy-button").addEventListener("click", e => {
  e.preventDefault();
    copyToClipboard(document.querySelector(".copy-text"));
});

function copyToClipboard(elem) {
  const copybutton = document.querySelector('.copy-button');

    // create hidden text element, if it doesn't already exist
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  if (isInput) {
      // can just use the original source element for the selection and copy
      target = elem;
      origSelectionStart = elem.selectionStart;
      origSelectionEnd = elem.selectionEnd;
  } else {
      // must use a temporary form element for the selection and copy
      target = document.getElementById(targetId);
      if (!target) {
          var target = document.createElement("textarea");
          target.style.position = "absolute";
          target.style.left = "-9999px";
          target.style.top = "0";
          target.id = targetId;
          document.body.appendChild(target);
      }
      target.textContent = elem.textContent;
  }
  // select the content
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);
  
  // copy the selection
  var succeed;
  try {
        succeed = document.execCommand("copy");
  } catch(e) {
      succeed = false;
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
  }
  
  if (isInput) {
      // restore prior selection
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
      // clear temporary content
      target.textContent = "";
  }
  copybutton.innerHTML = 'Copied'
  setTimeout(() => {
    copybutton.innerHTML = 'Copy'
  }, 3000);

  return succeed;

}

// Dynamic date for copyright section - Updates the year
// automatically once we enter a new year.

document.getElementById("date");

let currentDate = new Date();
let year = currentDate.getFullYear();
date.innerHTML = year;
