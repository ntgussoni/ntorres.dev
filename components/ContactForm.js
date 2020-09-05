import Button from "./Button";
import fetch from "isomorphic-fetch";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState,
    reset,
    errors,
  } = useForm();

  const onSubmit = async (formData) => {
    const data = await fetch(`/api/email`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: `Contact form at ntorres.dev`,
        text: `${formData.name} - ${formData.email} \n\n${formData.message}`,
      }),
    });

    const { code } = await data.json();
    if (code !== 200) {
      setError("general", {
        type: "manual",
        message:
          "An error occurred and the message could not be sent. Sorry!! Try again later",
      });
    } else {
      reset();
    }
  };

  return (
    <form className="w-full mt-16">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="name"
          >
            What's your name?
          </label>
          <input
            ref={register({ required: "Please complete this field" })}
            className="appearance-none block w-full  text-gray-700 border border-gray-400 invalid: rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary-lighter"
            name="name"
            id="name"
            type="text"
            placeholder="Jane"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic note">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="email"
          >
            E-mail
          </label>
          <input
            ref={register({
              required: "Please complete this field",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            name="email"
            className="appearance-none block w-full  text-gray-700 border border-gray-400 invalid: rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary-lighter"
            id="email"
            type="email"
            placeholder="jan@example.com"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic note">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="message"
          >
            Message
          </label>
          <textarea
            ref={register({ required: "Please complete this field" })}
            name="message"
            className="appearance-none block w-full  text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-primary-lighter h-32"
            id="message"
          />
          {errors.message && (
            <p className="text-red-500 text-xs italic note">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>
      {errors.general && (
        <p className="text-red-500 text-xs italic note mb-4">
          {errors.general.message}
        </p>
      )}
      <div className="md:flex md:items-center">
        <Button
          text={
            formState.submitCount == 0
              ? "Leave comment"
              : "Leave another comment"
          }
          loadingText="Sending"
          width={"80px"}
          height={"40px"}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
};

export default ContactForm;
