import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Link from "./Link";
import Copy from "./Copy";

const FormField = ({ dark }) => {
  const re =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const base_url = "https://frda.me/";
  const [form, setForm] = useState({
    original_link: "",
    unique_name: "",
    redirect_info: "",
  });
  const [clientError, setClientError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [validate, setValidate] = useState(false);
  const [checkedValue, setCheckValue] = useState(0);
  const [shorten_link, setShorten_link] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidate();
    setTimeout(() => {
      setValidate(false);
    }, 3000);

    try {
      if (form.original_link.length === 0) return;
      setLoading(true);
      if (!form.unique_name) {
        const response = await fetch("https://frda.me/api/shorten/", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
          },

          body: JSON.stringify({
            original_url: form.original_link,
            redirect: checkedValue,
            page_info: form.redirect_info,
          }),
        });

        if (response.status === 201) {
          setLoading(false);
          let returned_data = await response.json();
          let r_link = returned_data.short_url;
          let full_link = base_url + r_link;
          setShorten_link(full_link);
        } else if (response.status === 500) {
          setLoading(false);
          setServerError("Try again");
        } else if (response.status === 400) {
          setLoading(false);
          setClientError("Pls contact admin");
        }
      } else {
        const response = await fetch("https://frda.me/api/shorten/", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
          },

          body: JSON.stringify({
            original_url: form.original_link,
            short_url: form.unique_name,
            redirect: checkedValue,
            page_info: form.redirect_info,
          }),
        });

        if (response.status === 201) {
          setLoading(false);
          let returned_data = await response.json();
          let r_link = returned_data.short_url;
          let full_link = base_url + r_link;
          setShorten_link(full_link);
        } else if (response.status === 500) {
          setLoading(false);
          setServerError("Try again");
        } else if (response.status === 400) {
          setLoading(false);
          setServerError("Pls contact admin");
        }
      }
    } catch (e) {
      console.log(e);
      setServerError("Something went wrong, please try again");
      console.log(serverError);
    }
  };

  const handleValidate = () => {
    if (form.original_link === "") {
      setClientError("Provide a link");
      setValidate(true);
    } else if (re.test(String(form.original_link).toLowerCase()) !== true) {
      setClientError("Please provide a valid url");
      setValidate(true);
    }
  };

  const handleCheck = () =>{
    setRedirect(!redirect);
    setCheckValue(1)
  }


  return (
    <>
      <div
        className={
          dark
            ? "max-w-[600px] w-[90%] bg-[#2a2e32] p-5 rounded-md border-2 border-[#d0d0d0e6] text-center"
            : "max-w-[600px] w-[90%] bg-white p-5 rounded-md border-2 border-[#d0d0d0e6] text-center"
        }
      >
        <form onSubmit={handleSubmit}>
          <InputField
            name={"original_link"}
            onChange={handleChange}
            value={form.original_link}
            placeholder={
              "Original link (https://google.com/search?=what+is+a+link+shortener)"
            }
          />
          {clientError && (
            <div className={validate ? "text-red-600 text-center" : "hidden"}>
              {clientError}
            </div>
          )}
          <InputField
            name={"unique_name"}
            onChange={handleChange}
            value={form.unique_name}
            placeholder={"Optional unique name (https://frda.me/unique-name)"}
          />
          {redirect && (
            <InputField
              name={"redirect_info"}
              onChange={handleChange}
              value={form.redirect_info}
              placeholder={
                "(Optional) Give information about this link e.g This link redirects you to Faraday Landing page"
              }
            />
          )}
          <div className="text-left">
            <input
              className=" w-7 mr-4 rounded-lg accent-[#05b851]"
              type="checkbox"
              id="toggleBox"
              onChange={handleCheck}
            />
            <label className={dark ? "text-white" : ""} htmlFor="toggleBox">
              Add Redirect <span>(Takes longer)</span>
            </label>
          </div>
          <Button err={serverError} loading={loading} url={shorten_link} />
        </form>
        {shorten_link && <Link url={shorten_link} />}
        {shorten_link && <Copy url={shorten_link} />}
      </div>
    </>
  );
};

export default FormField;
