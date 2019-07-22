import styled from 'styled-components';
import { useState } from 'preact/hooks';

const Form = styled.form`
  display: grid;
  ${props => (props.width && `width: ${props.width}`) || `width: 300px`};
  max-width: 80vw;
  span {
    text-transform: capitalize;
  }
  input {
    margin-bottom: 10px;
    margin-top: 5px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    border-radius: 0.25rem;
    border: 1px solid #ced4da;
    padding: 0.5rem 0.7rem;
    color: #495057;

    :focus {
      color: #495057;
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
  button {
    outline: 0;
    cursor: pointer;
    margin-top: 10px;
    padding: 8px;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    :hover {
      background-color: #e2e6ea;
      border-color: #dae0e5;
    }
    ::-moz-focus-inner {
      border: 0;
    }
  }
`;

const FormView = ({ children, fields, onSubmit }) => {
  const [values, setValues] = useState({});

  const handleChange = e => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { target } = e;
    if (process.env.NODE_ENV === 'development') console.info(e);
    onSubmit({ target, values });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields &&
        fields.map(field => (
          <>
            <span id={`${field.name}-label`}>
              {field.name}
              {`: `}
            </span>

            <input
              key={field.name}
              type={field.type}
              name={field.name}
              id={field.name}
              onChange={handleChange}
              aria-labelledby={`${field.name}-label`}
            />
          </>
        ))}
      <button type="submit">Submit</button>
      {children}
    </Form>
  );
};

export default FormView;
