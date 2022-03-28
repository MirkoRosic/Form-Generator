import React, { useEffect, useState, useCallback } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const url = "http://localhost:4000/forms-generator";

function App() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const createSchema = useCallback((dataObject, bool) => {
    const schemaObject = {};
    const namesObject = {};

    dataObject.forEach((input) => {
      if (input.type === "checkbox") {
        schemaObject[input.name] = Yup.array()
          .required()
          .min(1, "At least one checkbox must be selected");

        //  Yup.array().required("Required");
      } else
        schemaObject[input.name] = Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required(`${input.name} field is required`);
      //add select and radio options and it's done
      if (input.type === "checkbox") {
        namesObject[input.name] = [];
        namesObject.toggle = false;
      }
      namesObject[input.name] = "";
    });

    if (bool) return schemaObject;
    else return namesObject;
  }, []);

  const inputRender = (input) => {
    switch (input.type) {
      case "checkbox":
      case "radio":
        return (
          <>
            {input.description && (
              <p className="description">{input.description}</p>
            )}

            <div className="radioContainer">
              <label htmlFor={input.label_id}>
                {capitalize(input.label_id)}
              </label>
              <Field type={input.type} name={input.name} value={input.value} />
            </div>
          </>
        );
      case "select":
        return (
          <div className="inputContainer">
            <label htmlFor={input.label_id}>{capitalize(input.label_id)}</label>
            <Field name={input.name} as={input.type}>
              <option value=""></option>
              {input.options.map((value, i) => {
                return (
                  <option key={i} value={value}>
                    {capitalize(value)}
                  </option>
                );
              })}
            </Field>
          </div>
        );
      case "textarea":
        return (
          <div className="inputContainer">
            <label htmlFor={input.label_id}>{capitalize(input.label_id)}</label>
            <Field
              id={input.label_id}
              name={input.name}
              as={input.type}
              rows={input.rows}
              cols={input.cols}
            ></Field>
          </div>
        );
      default:
        return (
          <div className="inputContainer">
            <label htmlFor={input.label_id}>{capitalize(input.label_id)}</label>
            <Field type={input.type} name={input.name} value={input.value} />
          </div>
        );
    }
  };

  const getForm = useCallback(async () => {
    const response = await fetch(url);
    const serverData = await response.json();
    const { data } = serverData;
    setData(data);
  }, []);

  const postReq = async (userInputs) => {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInputs),
    }).then(() => {
      console.log("Check database");
    });
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    getForm();
  }, [getForm]);

  return (
    <div>
      <Formik
        initialValues={createSchema(data)}
        validationSchema={Yup.object().shape(createSchema(data, true))}
        onSubmit={(values, { setSubmitting }) => {
          postReq(values);
          setSubmitting(false);
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
          }, 4000);
        }}
      >
        {({ touched, errors, isValid, handleSubmit, dirty }) => (
          <form onSubmit={handleSubmit}>
            <h1>Dynamic Forms</h1>
            <div className="flex">
              {data.map((input) => {
                return (
                  <React.Fragment key={input._id}>
                    {inputRender(input)}
                    {touched[input.name] && errors[input.name] ? (
                      <p className="error">
                        {capitalize(input.name).split("_").join(" ")} is
                        required
                      </p>
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                );
              })}

              <button type="submit" disabled={!(isValid && dirty)}>
                Submit Form
              </button>
            </div>
            {showModal && (
              <div className="modal">Form submitted successfully!</div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;
