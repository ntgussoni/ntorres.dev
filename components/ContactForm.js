/* eslint-disable react/no-unescaped-entities */
import fetch from 'isomorphic-fetch';
import { useForm } from 'react-hook-form';
import Button from './Button';

const ContactForm = () => {
  const { register, handleSubmit, setError, formState, reset } = useForm();

  const onSubmit = async (formData) => {
    const data = await fetch(`/api/email`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: `Contact form at ntorres.dev`,
        text: `${formData.name} - ${formData.email} \n\n${formData.message}`,
      }),
    });

    reset();

    const { code } = await data.json();
    if (code !== 200) {
      setError('general', {
        type: 'manual',
        message:
          'An error occurred and the message could not be sent. Sorry!! Try again later',
      });
    }
  };

  const { isSubmitting, errors } = formState;

  return (
    <form className="w-full mt-16">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold"
            htmlFor="name"
          >
            What's your name?
            <input
              {...register('name', { required: 'Please complete this field' })}
              className=" bg-transparent block w-full  text-white border border-white  rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none  focus:border-primary-blue focus:drop-shadow-inputs"
              type="text"
              placeholder="Jane"
              required
            />
          </label>
          {errors.name && (
            <p className="text-red-500 text-xs italic note absolute -bottom-3">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="email"
          >
            E-mail
            <input
              {...register('email', {
                required: 'Please complete this field',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              className=" bg-transparent block w-full  text-white border border-white  rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none  focus:border-primary-blue focus:drop-shadow-inputs"
              type="email"
              placeholder="jan@example.com"
              required
            />
          </label>

          {errors.email && (
            <p className="text-red-500 text-xs italic note absolute -bottom-3">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 relative">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="message"
          >
            Message
            <textarea
              {...register('message', {
                required: 'Please complete this field',
              })}
              className=" bg-transparent block w-full  text-white border border-white  rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none  focus:border-primary-blue focus:drop-shadow-inputs h-32"
            />
          </label>

          {errors.message && (
            <p className="text-red-500 text-xs italic note absolute -bottom-3">
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
          hot={false}
          text="Leave comment"
          loading={isSubmitting}
          loadingText="Sending"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
};

export default ContactForm;
