const FormButton = document.querySelector('.submitbutton');

FormButton.addEventListener('click', e => {
    e.preventDefault();
    const aliasInputField = document.querySelector('#alias'); 
    const textInput = document.querySelector('.newsletterForm input');
    const errorEl = document.querySelector('.error_isActiveText');
    const errorSV = document.querySelector('.server_error_isActiveText')
    const errorUl = document.querySelector('.url_error_isActiveText');
    const success = document.querySelector('.success_isActiveText');
    const redirectcheck = document.querySelector('#checkboxtoggle');
    const metacheck = document.querySelector('#metaboxtoggle');
    const metadesc = document.querySelector('#togglemetadesc');
    const metatitle = document.querySelector('#togglemetatitle');
    const metafile = document.querySelector('#togglemetafile');
    validate(FormButton, aliasInputField, textInput, errorEl, errorSV, errorUl, success, redirectcheck, metacheck, metadesc, metatitle, metafile);
  });

  const validate = async (buttonEl, aliasInput, inputField, errorField, errorSV, errorFieldAlias, successField, redirectcheck, metacheck, metadesc, metatitle, metafile) => {
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
      return;
    } else if (re.test(String(inputField.value).toLowerCase()) !== true) {
      inputField.classList.add('error_active');
      errorField.innerHTML = "Please provide a valid url (include https://)";
      errorField.style.display = 'block';
      setTimeout(() => {
        inputField.classList.remove('error_active');
        errorField.innerHTML = '';
        errorField.style.display = 'none';
      }, 3000);
      return;

    }

    if (redirectcheck.checked) {
      var checkInputValue = 1
    } else {
      var checkInputValue = 0
    }

    if (metacheck.checked) {

      var metacheckvalue = 1
      var metadescvalue = metadesc.value
      var metatitlevalue = metatitle.value
      var metaimagefile =  metafile.files[0]
      var metaimagefileBase64 = ""
      var reader = new FileReader();
    

      if (metadesc.value.length == 0) {
        metadesc.classList.add('error_active')
        setTimeout(() => {
          metadesc.classList.remove('error_active');
        }, 3000); 
        return;
      } else if (metatitle.value.length == 0) {
        metatitle.classList.add('error_active')
        setTimeout(() => {
          metatitle.classList.remove('error_active');
        }, 3000); 
        return;
      }
    
      reader.onloadend = function () {
        
        var metaimagefileBase64 = reader.result;

        try {
          handleAPICall(
            buttonEl,
            inputField,
            aliasInput,
            checkInputValue,
            metacheckvalue,
            metadescvalue,
            metatitlevalue,
            metaimagefileBase64,
            successField,
            errorSV,
            errorField,
            base_url
          );
        } catch (error) {
          console.error(error);
        }
        
      };
  
      reader.readAsDataURL(metaimagefile);
      return;

    }

    try {
      handleAPICall(
        buttonEl,
        inputField,
        aliasInput,
        checkInputValue,
        metacheckvalue,
        metadescvalue,
        metatitlevalue,
        metaimagefileBase64,
        successField,
        errorSV,
        errorField,
        base_url
      );
    } catch (error) {
      console.error(error);
    }

  };

  async function handleAPICall(
  buttonEl,
  inputField,
  aliasInput,
  checkInputValue,
  metacheckvalue,
  metadescvalue,
  metatitlevalue,
  metaimagefileBase64,
  successField,
  errorSV,
  errorField,
  base_url
) {

  const newSpan = document.createElement('div');

  errorSV.style.display = 'none';
  successField.style.display = 'none'
  buttonEl.innerHTML = '';
  buttonEl.style.display = 'flex';
  buttonEl.style.justifyContent = 'center';
  buttonEl.style.alignItems = 'center';
  buttonEl.disabled = true;
  newSpan.classList.add('loader');
  buttonEl.appendChild(newSpan);

  const apiUrl = `${base_url}api/shorten/`;
  
  const response = await fetch(
    apiUrl,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"*",
        "Access-Control-Allow-Headers":"*"
      },
      body: JSON.stringify(
        {
          original_url : inputField.value, 
          short_url : aliasInput.value,
          redirect : checkInputValue, 
          meta_check : metacheckvalue,
          meta_desc : metadescvalue,
          meta_title : metatitlevalue,
          meta_image : metaimagefileBase64,
        }
      ),
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
