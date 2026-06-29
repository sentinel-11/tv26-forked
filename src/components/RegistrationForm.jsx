import { useState, useRef, useEffect } from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  CheckCircle,
  // Lock,
  Send,
  Zap,
  ExternalLink,
  MoveRight,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavbarTv from "./NavbarTv";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const SERVER_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://api.vjdataquesters.com";

const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const transitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const FormComp = ({ setLoadingStatus, setSubmitStatus }) => {
  const [showPaymentFields, setShowPaymentFields] = useState(false); // Added this missing state
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const containerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [qr, setQr] = useState("VNRVJIETQR");
  const [qrLoading, setQrLoading] = useState(false);

  const compressImageWithCanvas = (file) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 1920;
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Canvas compression failed"));
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          },
          "image/jpeg",
          0.8
        );
      };

      img.onerror = (e) => reject(e);
    });

  const fetchQrCode = async () => {
    setQrLoading(true);
    api
      .get("/register/get-payment-qr")
      .then(({ data }) => {
        if (data.success) {
          setQr(data.qr);
        } else setQr("VNRVJIETQR");
        setQrLoading(false);
        setShowPaymentFields(true);
      })
      .catch((error) => {
        console.error("Error fetching QR code:", error);
        setQr("VNRVJIETQR");
        setQrLoading(false);
        setShowPaymentFields(true);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      college: "",
      collegeName: "",
      branch: "",
      section: "",
      rollno: "",
      year: "",
      phno: "",
      email: "",
      paymentplatform: "",
      transactionid: "",
    },
  });

  const watchCollege = watch("college");

  const onSubmit = async (data) => {
    if (!file || !data.transactionid || !data.rollno) {
      alert("Please fill all required fields and upload a payment proof.");
      return;
    }
    if (!acceptedTerms) {
      alert("Please accept the Terms & Conditions to continue.");
      return;
    }
    setLoadingStatus(true);
    try {
      const userId = `${data.transactionid.toLowerCase()}-${data.rollno
        .toLowerCase()
        .replace(/\s+/g, "-")}-`;
      const fileName = userId + file.name.toLowerCase().replace(/\s+/g, "-");
      const fileType = file.type;
      const getUrl = await api.post("/register/get-signed-url", {
        fileName,
        fileType,
      });

      if (!getUrl.data.success) {
        alert("Failed to upload file. Please try again.");
        return;
      }

      const { signedUrl, fileName: fileNameStorage } = getUrl.data;
      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": fileType,
        },
      });

      const finalData = {
        name: data.name,
        college: data.college === "Other" ? data.collegeName : data.college,
        branch: data.branch,
        section: data.section,
        rollno: data.rollno,
        year: data.year,
        phno: data.phno,
        email: data.email,
        paymentplatform: data.paymentplatform,
        transactionid: data.transactionid,
        image: fileNameStorage,
        qr,
      };
      const response = await api.post("/register", finalData);
      if (!response.data.success) {
        alert("Registration failed. Please try again.");
        return;
      }

      setSubmitStatus(true);
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again." + error.message);
    } finally {
      setLoadingStatus(false);
    }
  };

  return (
    <div ref={containerRef} className="text-[#13EC49] relative rounded-xl">
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-3">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3">
            <img
              src="/events/Technovista2025/tv25-icons/tv-logo-ani.gif"
              alt="TechnoVista 2k25 Logo"
              className="w-12 h-12 m:w-114 md:h-114 lg:w-16 lg:h-16 object-contain bg-white rounded-xl"
            />
            <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#00FF41] via-green-400 to-[#00FF41] bg-clip-text text-transparent">
              TechnoVista 2k25
            </h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto px-2 pb-4">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-4 md:p-6 border border-[#00FF41]/30 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] my-2">
              <div className="grid gap-4 md:gap-6">
                {/* Full Name */}
                <div className="transform hover:opacity-90 transition-transform duration-300">
                  <div className="group relative">
                    <label className="text-sm font-medium text-green-400 block mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 bg-black text-green-400 border border-[#00FF41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF41] focus:border-transparent placeholder-[#00FF41]"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 animate-bounce flex items-center gap-1">
                        <Zap size={12} />
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* College Selection */}
                <div className="transform hover:opacity-90 transition-transform duration-300">
                  <div className="group relative">
                    <label className="text-sm font-medium text-green-400 block mb-2">
                      College <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-6">
                      {[
                        { value: "VNRVJIET", label: "VNRVJIET" },
                        { value: "Other", label: "Other" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            value={option.value}
                            {...register("college", {
                              required: "College selection is required",
                            })}
                            className="w-5 h-5 rounded-full border-2 border-[#00FF41] accent-[#00FF41] focus:ring-[#00FF41] focus:outline-none transition duration-200 ease-in-out hover:scale-105"
                          />
                          <span className="text-green-400 group-hover:text-yellow-200 transition-colors duration-300">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.college && (
                      <p className="text-red-400 text-sm mt-1 animate-bounce flex items-center gap-1">
                        <Zap size={12} />
                        {errors.college.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Conditional College Name */}
                {watchCollege === "Other" && (
                  <motion.div
                    className="transform hover:opacity-90 transition-all duration-300"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="text-sm font-medium text-green-400 block mb-2">
                      College Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your college name"
                      className="w-full px-4 py-2 bg-black text-green-400 border border-[#00FF41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF41] focus:border-transparent placeholder-[#00FF41]"
                      {...register("collegeName", {
                        required: "College name is required",
                      })}
                    />
                    {errors.collegeName && (
                      <p className="text-red-400 text-sm mt-1 animate-bounce flex items-center gap-1">
                        <Zap size={12} />
                        {errors.collegeName.message}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Branch & Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="transform hover:opacity-90 transition-transform duration-300">
                    <label className="text-sm font-medium text-green-400 block mb-2">
                      Branch <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-2 bg-black text-green-400 border border-[#00FF41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF41] focus:border-transparent"
                      {...register("branch", {
                        required: "Branch is required",
                      })}
                    >
                      <option value="">Select Branch</option>
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="CSBS">CSBS</option>
                      <option value="CSE-DS">CSE-DS</option>
                      <option value="CSE-CyS">CSE-CyS</option>
                      <option value="AI&DS">AI&DS</option>
                      <option value="AIML">AIML</option>
                      <option value="IOT">IOT</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="EIE">EIE</option>
                      <option value="MECHANICAL">MECHANICAL</option>
                      <option value="CIVIL">CIVIL</option>
                      <option value="AUTOMOBILE">AUTOMOBILE</option>
                    </select>
                    {errors.branch && (
                      <p className="text-red-400 text-sm mt-1 animate-bounce flex items-center gap-1">
                        <Zap size={12} />
                        {errors.branch.message}
                      </p>
                    )}
                  </div>
                  <div className="transform hover:opacity-90 transition-transform duration-300">
                    <label className="text-sm font-medium text-green-400 block mb-2">
                      Section <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-2 bg-black text-green-400 border border-[#00FF41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF41] focus:border-transparent"
                      {...register("section", {
                        required: "Section is required",
                      })}
                    >
                      <option value="">Select Section</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                    {errors.section && (
                      <p className="text-red-400 text-sm mt-1 animate-bounce flex items-center gap-1">
                        <Zap size={12} />
                        {errors.section.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Roll Number & Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="transform hover:opacity-90 transition-transform duration-300">
                    <label className="text-sm font-medium text-green-400 block mb-2">
                      College ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter college ID"
                      className="w-full px-4 py-2 bg-black text-green-400 border border-[#00FF41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF41] focus:border-transparent placeholder-[#00FF41]"
                      {...register("rollno", {
                        required: "College ID is required",
                      })}
                    />
                    {errors.rollno && (
                      <p className="text-red-400 text-sm mt-1 animate-bounce flex items-center gap-1">
                        <Zap size={12} />
                        {errors.rollno.message}
                      </p>
                    )}
                  </div>
                  <div className="transform hover:opacity-90 transition-transform duration-300">
                    <label className="text-sm font-medium text-green-400 block mb-2">
                      Year <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-2 bg-black text-green-400 border border-[#00FF41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF41] focus:border-transparent"
                      {...register("year", { required: "Year is required" })}
                    >
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                    {errors.year && (
                      <p className="text-red-400 text-sm mt-1 animate-bounce flex items-center gap-1">
                        <Zap size={12} />
                        {errors.year.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="transform hover:opacity-90 transition-transform duration-300">
                    <label className="text-sm font-medium text-green-400 block mb-2">
                      Contact Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      className="w-full px-4 py-2 bg-black text-green-400 border border-[#00FF41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF41] focus:border-transparent placeholder-[#00FF41]"
                      {...register("phno", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter a valid 10-digit phone number",
                        },
                      })}
                    />
                    {errors.phno && (
                      <p className="text-red-400 text-sm mt-1 animate-bounce flex items-center gap-1">
                        <Zap size={12} />
                        {errors.phno.message}
                      </p>
                    )}
                  </div>
                  <div className="transform hover:opacity-90 transition-transform duration-300">
                    <label className="text-sm font-medium text-green-400 block mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 bg-black text-green-400 border border-[#00FF41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF41] focus:border-transparent placeholder-[#00FF41]"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 animate-bounce flex items-center gap-1">
                        <Zap size={12} />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {showPaymentFields && (
                  <motion.div
                    className="grid gap-4 md:gap-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Payment QR Code Section */}
                    <div className="transform hover:opacity-90 transition-transform duration-300">
                      <div className="group relative">
                        <label className="text-sm font-medium text-green-400 block mb-2">
                          Payment QR Code{" "}
                          <span className="text-red-400">*</span>
                        </label>
                        <div className="w-full p-4 bg-black/30 border border-[#00FF41] rounded-md">
                          <div className="flex flex-col items-center space-y-3">
                            <h3 className="text-lg font-semibold text-green-400">
                              Scan QR Code to Pay ₹
                              {watchCollege === "VNRVJIET" ? "170" : "250"}
                            </h3>
                            <div className="bg-white rounded-xl p-3 shadow-lg">
                              <img
                                src={`/${
                                  watchCollege === "VNRVJIET"
                                    ? `${qr}170.jpg`
                                    : `${qr}250.jpg`
                                }`}
                                alt="Payment QR Code"
                                className="w-48 h-48 md:w-56 md:h-56 object-contain rounded-lg"
                              />
                            </div>
                            <p className="text-sm text-green-400/80 text-center">
                              After payment, upload screenshot below and enter
                              transaction details
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* File Upload Section */}
                    <div className="transform hover:opacity-90 transition-transform duration-300">
                      <div className="group relative">
                        <label className="text-sm font-medium text-green-400 block mb-2">
                          Payment Screenshot{" "}
                          <span className="text-red-400">*</span>
                          <span className="block text-xs font-normal text-yellow-200 mt-1">
                            (Make sure that the transaction ID is present in the
                            uploaded screenshot)
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={async (e) => {
                              const imageFile = e.target.files[0];
                              if (!imageFile) return;

                              // Only allow PNG, JPEG, JPG
                              const allowedTypes = [
                                "image/png",
                                "image/jpeg",
                                "image/jpg",
                              ];
                              if (!allowedTypes.includes(imageFile.type)) {
                                alert(
                                  "Only PNG, JPEG, or JPG files are allowed."
                                );
                                e.target.value = "";
                                return;
                              }

                              try {
                                const compressedFile =
                                  await compressImageWithCanvas(imageFile);
                                setFile(compressedFile);
                              } catch (error) {
                                setFile(imageFile); // Fallback to original file
                              }
                            }}
                            className="w-full px-4 py-2 bg-black text-green-400 border border-[#00FF41] rounded-md 
                               focus:outline-none focus:ring-2 focus:ring-[#00FF41] focus:border-transparent
                               file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 
                               file:text-sm file:font-medium file:bg-[#00FF41] file:text-black
                               hover:file:bg-[#00FF41] file:cursor-pointer cursor-pointer"
                          />
                          {file && (
                            <p className="text-green-400/80 text-sm mt-1 flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                              File selected: {file.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {watchCollege && !showPaymentFields && (
                  <motion.div
                    className="text-center py-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow:
                          "0 20px 40px rgba(242, 202, 70, 0.3), 0 0 60px rgba(242, 202, 70, 0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={async () => {
                        await fetchQrCode();
                      }}
                      className="group relative inline-flex items-center justify-center gap-2 px-4 py-1
                                      bg-gradient-to-r from-[#00FF41] via-[#00FF41] to-green-700
                                      text-black font-bold text-xl rounded-2xl shadow-xl
                                      transition-all duration-500 ease-out
                                      hover:shadow-2xl hover:shadow-[#00FF41]/50
                                      focus:outline-none focus:ring-4 focus:ring-[#00FF41]/60
                                      border-2 border-[#00FF41]/30
                                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-400/20 before:to-transparent before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-300
                                      hover:before:opacity-100
                                      overflow-hidden"
                    >
                      {/* Text with gradient */}
                      <span className="bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent font-bold font-sans">
                        Pay ₹ {watchCollege === "VNRVJIET" ? "170" : "250"} /-
                      </span>
                      {/* Arrow with slide animation */}
                      {qrLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <MoveRight className="scale-75" />
                      )}
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </motion.button>
                  </motion.div>
                )}

                {/* Payment Platform & Transaction ID - Only show after clicking pay button */}
                {showPaymentFields && (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="transform hover:opacity-90 transition-transform duration-300">
                      <label className="text-sm font-medium text-green-400 block mb-2">
                        Payment Platform <span className="text-red-400">*</span>
                      </label>
                      <select
                        className="w-full px-4 py-2 bg-black text-green-400 border border-[#00FF41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF41] focus:border-transparent"
                        {...register("paymentplatform", {
                          required: showPaymentFields
                            ? "Please select a payment platform"
                            : false,
                        })}
                      >
                        <option value="">Select Payment Platform</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Paytm">Paytm</option>
                        <option value="Amazon Pay">Amazon Pay</option>
                        <option value="BHIM UPI">BHIM UPI</option>
                        <option value="FamPay">FamPay</option>
                        <option value="Mobikwik">Mobikwik</option>
                        <option value="WhatsApp Pay">WhatsApp Pay</option>
                        <option value="FreeCharge">FreeCharge</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.paymentplatform && (
                        <p className="text-red-400 text-sm mt-1 animate-bounce flex items-center gap-1">
                          <Zap size={12} />
                          {errors.paymentplatform.message}
                        </p>
                      )}
                    </div>
                    <div className="transform hover:opacity-90 transition-transform duration-300">
                      <label className="text-sm font-medium text-green-400 block mb-2">
                        Transaction ID <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter transaction ID"
                        className="w-full px-4 py-2 bg-black text-green-400 border border-[#00FF41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF41] focus:border-transparent placeholder-[#00FF41]"
                        {...register("transactionid", {
                          required: showPaymentFields
                            ? "Transaction ID is required"
                            : false,
                        })}
                      />
                      {errors.transactionid && (
                        <p className="text-red-400 text-sm mt-1 animate-bounce flex items-center gap-1">
                          <Zap size={12} />
                          {errors.transactionid.message}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Submit Button - Only show after payment fields are visible */}
                {showPaymentFields && (
                  <>
                    <div className="flex items-start gap-3 mt-4 p-4 bg-black/20 border border-[#00FF41]/40 rounded-xl">
                      <input
                        type="checkbox"
                        id="terms-checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 text-black bg-black border-[#00FF41] rounded focus:ring-[#00FF41] focus:ring-0 focus:outline-none accent-[#00FF41] cursor-pointer"
                      />
                      <label
                        htmlFor="terms-checkbox"
                        className="text-sm text-green-400 leading-relaxed  "
                      >
                        I agree to the{" "}
                        <a
                          href="/technovista/terms-and-conditions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#13EC49] underline hover:text-yellow-200 transition-colors duration-200 font-medium"
                        >
                          Terms & Conditions
                        </a>
                        <span className="text-red-400 ml-1">*</span>
                      </label>
                    </div>
                    <motion.div
                      className="mt-3 text-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!acceptedTerms}
                        type="submit"
                        className="group relative inline-flex items-center justify-center gap-3 px-6 py-2 mb-2
        bg-gradient-to-r from-[#00FF41] via-[#00FF41] to-green-700
        text-black font-bold text-lg rounded-2xl shadow-md
        transition-all duration-300 ease-out
        hover:shadow-xl hover:shadow-[#00FF41]/40
        focus:outline-none focus:ring-4 focus:ring-[#00FF41]/50
        disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="tracking-wide">Submit</span>
                        <Send
                          size={18}
                          className={`transition-transform duration-300`}
                        />
                      </motion.button>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const SubmittedComp = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      key="submitted"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={transitionVariants}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-black text-green-400 px-4"
    >
      {/* Check Icon Container */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.2 }}
        className="bg-[#00FF41] text-black p-4 rounded-full shadow-lg"
      >
        <CheckCircle size={50} />
      </motion.div>

      {/* Title */}
      <h2 className="text-3xl font-bold mt-6 text-yellow-200 drop-shadow-sm">
        Submission Successful!
      </h2>

      {/* Subtitle */}
      <p className="text-yellow-100 text-sm text-center mt-4">
        Thank you for registering. You{"'"}ll receive your pass via email within
        48 hours.
        <br />
        <span className="text-green-400 font-medium">
          Please check your spam folder as well.
        </span>
      </p>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/technovista/events")}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full shadow-md 
          bg-gradient-to-r from-[#00FF41] via-[#00FF41] to-green-700 
          text-black hover:shadow-[#00FF41]/30 transition-all duration-300"
      >
        <ExternalLink size={18} />
        Explore Events
      </motion.button>
    </motion.div>
  );
};

const LoadingComp = () => {
  return (
    <div className="flex flex-col items-center justify-center text-green-400 h-full min-h-[90vh]">
      <motion.div
        className="relative backdrop-blur-xl border h-full border-[#00FF41]/30 shadow-[0_0_40px_rgba(255,255,255,0.05)] rounded-2xl p-10 min-w-[80%]  lg:w-full text-center flex flex-col items-center justify-center min-h-[90vh]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#facc15" }} />
        </Box>
        <motion.p
          animate="animate"
          className="mt-6 text-yellow-200 font-medium text-base"
        >
          Loading, please wait...
        </motion.p>
      </motion.div>
    </div>
  );
};

const FormClosedComp = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-green-400 h-full min-h-[90vh]">
      <motion.div
        className="relative backdrop-blur-xl border border-[#00FF41]/30 shadow-[0_0_40px_rgba(255,255,255,0.05)] rounded-2xl p-10 min-w-[80%] lg:w-full text-center flex flex-col items-center justify-center min-h-[90vh]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Lock size={48} className="text-green-400 mb-4" />
        <motion.p
          animate="animate"
          className="text-yellow-200 font-medium text-base"
        >
          This form is currently closed.
        </motion.p>
        <p className="text-yellow-200/70 text-sm mt-2">
          For any queries, please contact the{" "}
          <Link to="/technovista#coordinators" className="underline">
            student coordinators
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

const RegistrationForm = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [isFormClosed, setIsFormClosed] = useState(true);

  return (
    <>
      <NavbarTv />
      <motion.div
        className="bg-black rounded-2xl shadow-2xl lg:border-2 border-[#00FF41]/30 relative lg:h-[90vh]"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Scrollable content container */}
        <div
          className="relative z-10 h-full small-scrollbar overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loadingStatus ? (
            <LoadingComp />
          ) : isFormClosed ? (
            <FormClosedComp />
          ) : submitStatus ? (
            <SubmittedComp />
          ) : (
            <FormComp
              setLoadingStatus={setLoadingStatus}
              setSubmitStatus={setSubmitStatus}
            />
          )}
        </div>
      </motion.div>
    </>
  );
};

export default RegistrationForm;
