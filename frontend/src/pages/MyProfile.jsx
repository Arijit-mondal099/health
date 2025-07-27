import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserProfile } from "../features/user/userSlice.js";
import { upload_icon } from "../assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(false);
  const dispatch = useDispatch();
  const { loading, userData } = useSelector((store) => store.user);

  const handleProfileEdit = async () => {
    try {
      const formData = new FormData();

      image && formData.append("image", image);
      formData.append("name", user?.name);
      formData.append("phone", user?.phone);
      formData.append("address", user?.address);
      formData.append("gender", user?.gender);
      formData.append("dob", user?.dob);

      dispatch(updateUserProfile(formData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (loading) {
    return (
      <div className="w-full sm:max-w-xl flex flex-col gap-2.5 text-sm mt-25">
        <div className="w-full h-auto max-w-[160px] rounded-md animate-pulse dark:border-gray-700">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
          <div className="h-2.5 w-20 bg-gray-200 rounded-full dark:bg-gray-700 mb-4" />
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 w-30 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 w-15 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        </div>
      </div>
    );
  }

  return (
    user && (
      <div className="w-full sm:max-w-xl flex flex-col gap-2.5 text-sm mt-25">
        <label
          htmlFor={user._id}
          className={`${isEdit && "cursor-pointer"} relative max-w-[160px]`}
        >
          <img
            src={image ? URL.createObjectURL(image) : user?.image}
            className={`mt-10 w-full rounded-md border border-gray-200 ${
              isEdit && "opacity-50"
            }`}
            alt="user profile image"
          />

          {isEdit && (
            <img
              src={upload_icon}
              className="absolute z-1 w-20 bottom-9 right-9 border border-gray-200 rounded-lg"
              alt="upload image"
            />
          )}

          {isEdit && (
            <input
              type="file"
              id={user._id}
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          )}
        </label>

        {/* ---------------------------- name section ----------------------------- */}
        {isEdit ? (
          <input
            className="bg-green-100/50 text-2xl font-semibold text-gray-700 mt-4 p-2 rounded-md outline-none focus:border"
            type="text"
            value={user.name}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <h1 className="text-2xl font-semibold text-gray-700 mt-6">
            {user.name}
          </h1>
        )}
        <div className="w-full h-[1px] bg-gray-200 -mt-2" />

        {/* ---------------------------- contact information section ------------------------------ */}
        <div className="flex flex-col items-start gap-2">
          <p className="my-4 text-base text-gray-500 font-medium underline">
            CONTACT INFORMATION
          </p>

          <div className="flex items-center gap-10 text-sm mb-1">
            <p className="text-gray-600">Email id:</p>
            <p className={`${isEdit ? "text-gray-200" : "text-blue-600"}`}>
              {user.email}
            </p>
          </div>

          <div className="flex items-center gap-10 text-sm mb-1">
            <p className="text-gray-600">Phone:</p>
            {isEdit ? (
              <input
                className="bg-green-100/50 text-gray-700 mt-4 p-1 rounded-md outline-none focus:border"
                type="text"
                value={user?.phone}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-600">{user?.phone}</p>
            )}
          </div>

          <div className="flex items-center gap-10 text-gray-600 text-sm">
            <p>Address:</p>
            {isEdit ? (
              <input
                className="bg-green-100/50 text-gray-700 mt-4 p-1 rounded-md outline-none focus:border"
                type="text"
                value={user.address}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            ) : (
              <p>{user?.address || "Not set!"}</p>
            )}
          </div>
        </div>

        {/* ---------------------- basic information section -------------------------- */}
        <div>
          <p className="my-4 text-base text-gray-500 font-medium underline">
            BASIC INFORMATION
          </p>

          <div className="flex items-center gap-10 text-gray-600 text-sm mb-1">
            <p>Gender:</p>
            {isEdit ? (
              <select
                className="bg-green-100/50 text-gray-700 mt-4 p-1 rounded-md outline-none focus:border"
                value={user?.gender}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="gender">gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            ) : (
              <p>{user?.gender}</p>
            )}
          </div>

          <div className="flex items-center gap-10 text-gray-600 text-sm">
            <p>Birthday:</p>
            {isEdit ? (
              <input
                className="bg-green-100/50 text-gray-700 mt-4 p-1 rounded-md outline-none focus:border"
                type="date"
                value={user.dob}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p>{user.dob}</p>
            )}
          </div>
        </div>

        {/* --------------------- edit & save btn section ------------------------- */}
        <div className="flex items-center gap-4 mt-10 flex-wrap">
          {isEdit ? (
            <button
              className="px-8 py-2 rounded-full border border-green-400 cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-200"
              onClick={() => {
                setIsEdit(false);
                handleProfileEdit();
              }}
            >
              Save information
            </button>
          ) : (
            <button
              className="px-8 py-2 rounded-full border border-green-400 cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-200"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
