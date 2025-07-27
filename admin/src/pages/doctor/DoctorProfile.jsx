import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  editDoctorProfile,
  getDoctorProfile,
} from "../../features/doctor/doctorSlice.js";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { doctor } = useSelector((store) => store.doctor);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");
  const [available, setAvailable] = useState(true);
  const [address, setAddress] = useState("");

  const handleEdit = async () => {
    try {
      const formData = new FormData();

      image && formData.append("image", image);
      formData.append("name", name);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("fees", fees);
      formData.append("available", available);
      formData.append("address", address);

      await dispatch(editDoctorProfile(formData)).unwrap();
      toast.success("Profile updated");
    } catch (error) {
      console.log(error);
      toast.error("Faild to update profile");
    }
  };

  useEffect(() => {
    dispatch(getDoctorProfile());
  }, []);

  useEffect(() => {
    if (doctor) {
      setName(doctor.name || "");
      setSpeciality(doctor.speciality || "");
      setDegree(doctor.degree || "");
      setExperience(doctor.experience || "");
      setAbout(doctor.about || "");
      setFees(doctor.fees || "");
      setAvailable(doctor.available || false);
      setAddress(doctor.address || "");
    }
  }, [doctor]);

  return (
    doctor && (
      <div className="flex flex-col gap-4 w-full px-2 md:px-8 py-4 md:py-8 overflow-hidden">
        <div className="w-full max-w-xl h-full max-h-[80vh] overflow-auto shadow rounded-md p-2 sm:p-4">
          {/* Doctor info */}
          <label
            htmlFor="doc-image"
            className={`relative max-w-[160px] ${
              isEdit && "cursor-pointer opacity-40"
            }`}
          >
            {isEdit && (
              <input
                type="file"
                id="doc-image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            )}
            <img
              src={image ? URL.createObjectURL(image) : doctor.image}
              alt="doctor-image"
              className="max-w-[200px] bg-green-200 object-cover rounded-md"
            />
          </label>

          <div className="grid grid-cols-[1fr_3fr] gap-2 mt-5">
            <label htmlFor="name" className="text-gray-500 font-medium">
              Name:
            </label>

            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={isEdit ? false : true}
              className={`px-2 py-1 outline-none rounded-md font-medium text-gray-700 ${
                isEdit && "border border-gray-200"
              }`}
            />
          </div>

          <div className="grid grid-cols-[1fr_3fr] gap-2 mt-2">
            <label htmlFor="email" className="text-gray-500 font-medium">
              Email:
            </label>

            <input
              type="email"
              id="email"
              value={doctor.email}
              readOnly={true}
              className={`px-2 py-1 outline-none rounded-md font-medium text-gray-700 ${
                isEdit && "text-gray-400"
              }`}
            />
          </div>

          <div className="grid grid-cols-[1fr_3fr] gap-2 mt-2">
            <label htmlFor="speciality" className="text-gray-500 font-medium">
              Speciality:
            </label>

            <select
              required
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              disabled={isEdit ? false : true}
              className={`px-2 py-1 outline-none rounded-md font-medium text-gray-700 ${
                isEdit && "border border-gray-200"
              }`}
            >
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div className="grid grid-cols-[1fr_3fr] gap-2 mt-2">
            <label htmlFor="degree" className="text-gray-500 font-medium">
              Degree:
            </label>

            <input
              type="text"
              id="degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              readOnly={isEdit ? false : true}
              className={`px-2 py-1 outline-none rounded-md font-medium text-gray-700 ${
                isEdit && "border border-gray-200"
              }`}
            />
          </div>

          <div className="grid grid-cols-[1fr_3fr] gap-2 mt-2">
            <label htmlFor="exp" className="text-gray-500 font-medium">
              Experience:
            </label>

            <input
              type="text"
              id="exp"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              readOnly={isEdit ? false : true}
              className={`px-2 py-1 outline-none rounded-md font-medium text-gray-700 ${
                isEdit && "border border-gray-200"
              }`}
            />
          </div>

          {/* Doctor about */}
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="about" className="text-gray-500 font-medium">
              About:
            </label>

            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              readOnly={isEdit ? false : true}
              className={`w-full max-h-20 px-2 py-1 outline-none rounded-md font-medium text-gray-600 ${
                isEdit && "border border-gray-200"
              }`}
            ></textarea>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <label htmlFor="fees" className="text-gray-500 font-medium">
              Fees:
            </label>

            <input
              type="text"
              id="fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              readOnly={isEdit ? false : true}
              className={`px-2 py-1 outline-none rounded-md font-medium text-gray-700 ${
                isEdit && "border border-gray-200"
              }`}
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <label htmlFor="available" className="text-gray-500 font-medium">
              Available:
            </label>
            <input
              type="checkbox"
              id="available"
              disabled={isEdit ? false : true}
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="address" className="text-gray-500 font-medium">
              Address:
            </label>

            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              readOnly={isEdit ? false : true}
              className={`w-full max-h-20 px-2 py-1 outline-none rounded-md font-medium text-gray-600 ${
                isEdit && "border border-gray-200"
              }`}
            ></textarea>
          </div>

          {isEdit ? (
            <button
              onClick={() => { setIsEdit(!isEdit); handleEdit() }}
              className="mt-5 px-8 py-2 rounded-full bg-white border border-gray-400 cursor-pointer hover:bg-green-500 transition-all duration-200 hover:text-white"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="mt-5 px-8 py-2 rounded-full bg-white border border-gray-400 cursor-pointer hover:bg-green-500 transition-all duration-200 hover:text-white"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
