import { useState } from "react";
import { spinner, upload_area } from "../../assets";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor } from "../../features/admin/adminSlice.js";

const AddDoctor = () => {
  const [docImage, setDocImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [education, setEducation] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");

  const { loading } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!docImage) {
        toast.error("Doctor image not provided!");
        return;
      }

      const formData = new FormData(); // create form data intance
      formData.append("image", docImage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", education);
      formData.append("address", address);
      formData.append("about", about);

      await dispatch(addDoctor(formData)).unwrap();
      toast.success("Doctor added successfully!");

      setName("");
      setEmail("");
      setPassword("");
      setAbout("");
      setAddress("");
      setDocImage(false);
      setEducation("");
      setSpeciality("");
      setFees("");
      setExperience("");
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen px-2 md:px-8 py-4 md:py-8"
    >
      <h1 className="text-2xl sm:3xl md:4xl font-semibold text-gray-700">
        Add Doctor
      </h1>

      <div className="w-full max-w-3xl h-full max-h-[80vh] border border-gray-200 shadow rounded-lg mt-4 p-2 md:p-4 overflow-y-scroll">
        {/* doctor image upload section ------------------------- */}
        <div className="flex items-center gap-4">
          <label htmlFor="doctorImage" className="cursor-pointer">
            <img
              src={docImage ? URL.createObjectURL(docImage) : upload_area}
              alt="upload_area"
              className="w-15 md:w-20 border border-gray-200 rounded-full"
            />
            <input
              type="file"
              id="doctorImage"
              hidden
              onChange={(e) => setDocImage(e.target.files[0])}
            />
          </label>
          <p className="text-gray-500 text-sm">
            Upload doctor
            <br /> picture
          </p>
        </div>

        {/* doctor details section */}
        <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
          {/* left form section --------------------------------- */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1 text-sm text-gray-500">Doctor name</p>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full md:min-w-[20rem] border border-gray-200 p-2 rounded-md outline-none focus:border-gray-600"
              />
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500">Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:min-w-[20rem] border border-gray-200 p-2 rounded-md outline-none focus:border-gray-600"
              />
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500">Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full md:min-w-[20rem] border border-gray-200 p-2 rounded-md outline-none focus:border-gray-600"
              />
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500">Experience</p>
              <select
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full md:min-w-[20rem] border border-gray-200 p-2 rounded-md outline-none focus:border-gray-600"
              >
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <option key={index} value={`${index + 1} Year`}>{`${
                      index + 1
                    } Year`}</option>
                  ))}
              </select>
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500">Fees</p>
              <input
                type="text"
                placeholder="Fees"
                required
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="w-full md:min-w-[20rem] border border-gray-200 p-2 rounded-md outline-none focus:border-gray-600"
              />
            </div>
          </div>

          {/* right form section -------------------------------- */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1 text-sm text-gray-500">Speciality</p>
              <select
                required
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full md:min-w-[20rem] border border-gray-200 p-2 rounded-md outline-none focus:border-gray-600"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500">Education</p>
              <input
                type="text"
                placeholder="Education"
                required
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full md:min-w-[20rem] border border-gray-200 p-2 rounded-md outline-none focus:border-gray-600"
              />
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500">Address</p>
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full md:min-w-[20rem] border border-gray-200 p-2 rounded-md outline-none focus:border-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 text-sm text-gray-700">
          <p className="mb-1 text-sm text-gray-500">About me</p>
          <textarea
            placeholder="write about yourself"
            rows={5}
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full md:w-[67%] p-2 outline-none border border-gray-200 focus:border-gray-600 rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-5 bg-green-500 px-8 py-2 text-white rounded-full cursor-pointer hover:scale-102 transition-all duration-200"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <img src={spinner} alt="spinner" className="w-5 animate-spin" />
              <p>Adding...</p>
            </div>
          ) : (
            "Add doctor"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
