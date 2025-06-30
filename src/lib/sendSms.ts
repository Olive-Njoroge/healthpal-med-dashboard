import axios from "axios";

export const sendSMS = async (to: string, message: string, name?: string) => {
  try {
    const res = await axios.post("http://localhost:8081/send-sms", {
      to,
      message,
      name,
    });
    return res.data;
  } catch (err: any) {
    return {
      success: false,
      error: err.response?.data?.error || err.message,
    };
  }
};
