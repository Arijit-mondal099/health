import { about_image } from "../assets";

const About = () => {
  return (
    <div className="flex flex-col justify-center gap-5 my-10 mt-25">
      {/* ---------------------- section one ---------------------- */}
      <h1 className="uppercase text-3xl font-medium text-gray-500">
        About <span className="text-gray-700">Us</span>
      </h1>

      <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
        <img
          src={about_image}
          alt="about_image"
          className="w-full max-w-[360px] rounded-md"
        />

        <div className="flex flex-col gap-6 w-full sm:-[70%] lg:p-6 text-sm lg:text-lg text-gray-500 font-medium">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>

          <p className="text-gray-600 font-semibold">Our Vision</p>

          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      {/* ---------------------- section two ---------------------- */}
      <h1 className="uppercase text-gray-500 text-2xl font-semibold mt-20">
        Why <span className="text-gray-700">Choose Us</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="p-10 border border-gray-400 hover:bg-green-500 transition-all duration-200 cursor-pointer">
          <p className="uppercase text-gray-800 text-lg font-semibold leading-tight mb-5">
            Efficiency:
          </p>
          <p className="text-gray-600">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>

        <div className="p-10 border border-gray-400 hover:bg-green-500 transition-all duration-200 cursor-pointer">
          <p className="uppercase text-gray-800 text-lg font-semibold leading-tight mb-5">
            Convenience:
          </p>
          <p className="text-gray-600">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>

        <div className="p-10 border border-gray-400 hover:bg-green-500 transition-all duration-200 cursor-pointer">
          <p className="uppercase text-gray-800 text-lg font-semibold leading-tight mb-5">
            Personalization:
          </p>
          <p className="text-gray-600">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
