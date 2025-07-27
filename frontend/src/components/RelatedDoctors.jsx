import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ doctorId, speciality }) => {
  const { doctors } = useSelector((store) => (store.doctor));
  const [relatedDoc, setrelatedDoc] = useState([]);
  const navigate = useNavigate();

  const getRelatedDoctors = () => {
    const doctorsList = doctors.filter(
      (doc) => doc.speciality === speciality && doc._id !== doctorId
    );
    setrelatedDoc(doctorsList);
  };

  useEffect(() => {
    getRelatedDoctors();
  }, [doctorId, speciality]);

  return (
    <div className="flex flex-col items-center justify-center mt-25">
      <h2 className="text-2xl font-medium text-gray-800">Related Doctors</h2>
      <p className="text-sm text-gray-500">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5 mt-10">
        {relatedDoc.length > 0 ? (
          relatedDoc.slice(0, 5).map((doc) => (
            <div
              key={doc._id}
              className="bg-green-100/50 border border-green-200 rounded-md p-4 cursor-pointer"
              onClick={() => {
                navigate(`/appointment/${doc._id}`);
                scrollTo(0, 0);
              }}
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="border-b border-green-200"
              />

              <div className="flex flex-col items-start justify-center mt-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-1.5 w-1.5 animate-ping rounded-full bg-[#0FBF00]" />
                  <p className="text-xs font-medium text-[#0FBF00]">
                    Available
                  </p>
                </div>

                <h2 className="text-sm sm:text-xl leading-tight font-medium mt-2 capitalize">
                  {doc.name}
                </h2>
                <p className="text-xs text-gray-600 font-medium mt-1 capitalize">
                  {doc.speciality}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No related doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedDoctors;
