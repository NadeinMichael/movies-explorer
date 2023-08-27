import { useState } from 'react';

export default function useControlInputs(inputValues = {}) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, setValues, handleChange };
}
