import { useAuth } from "./useAuth";
import { useFormContext } from "../Context/FormContext";
import { useToast } from "../Context/ToastContext";

export default function useForm() {
  const { registerStep1, registerStep2 } = useAuth();
  const { formData: values, setFormData: setValues } = useFormContext();
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setValues((prevValues) => {
      const keys = name.split(".");

      if (keys.length === 1) {
        return {
          ...prevValues,
          [name]: newValue,
        };
      }

      let updatedValues = { ...prevValues };
      let current = updatedValues;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        current[key] = { ...current[key] };
        current = current[key];
      }

      current[keys[keys.length - 1]] = newValue;

      return updatedValues;
    });
  };

  const calculateGeo = async () => {
    const { city, street, zipcode } = values.address;

    if (!city) {
      return;
    }

    try {
      const addressParts = [street, city, zipcode].filter(Boolean);
      const fullAddress = addressParts.join(", ");

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`
      );

      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];

        setValues(prev => ({
          ...prev,
          address: {
            ...prev.address,
            geo: {
              lat: parseFloat(lat),
              lng: parseFloat(lon)
            }
          }
        }));
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  
  const isValidStep1 = () => {
    return values.username && values.website;
  };

  const handleSubmitStep1 = async () => {
    if (!isValidStep1()) {
      showToast("Please fill all required fields", "error");
      return false;
    }

    await registerStep1(values.username);
    return true;
  };

  const isValidStep2 = () => {
    return (
      values.email &&
      values.address.city &&
      values.name
    );
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    await calculateGeo();
    if (!isValidStep2()) {
      showToast("Please fill all required fields", "error");
      return false;
    }

    const newUser = await registerStep2(values);
    return true;
  };

  return {
    values,
    setValues,
    handleChange,
    handleSubmitStep1,
    handleSubmitStep2,
  };
}
