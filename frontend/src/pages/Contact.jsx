import { contact_image } from "../assets";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-25 mb-40">
      <h1 className="uppercase text-3xl font-medium text-gray-500">
        contact <span className="text-gray-700">Us</span>
      </h1>

      <div className="flex flex-col lg:flex-row justify-center gap-10">
        <img
          src={contact_image}
          alt="contact_image"
          className="w-full max-w-[400px] rounded-md"
        />

        <div className="flex flex-col items-start justify-center gap-6 text-gray-600 text-sm">
          <p className="uppercase text-lg font-medium">OUR OFFICE</p>
          <p>
            54709 Willms Station
            <br /> Suite 350, Washington, USA
          </p>

          <div>
            <p>Tel: +91 8016075232</p>
            <p>Email: arijitm717@gmail.com</p>
          </div>

          <p className="uppercase text-lg font-medium">Careers at PRESCRIPTO</p>
          <p>Learn more about our teams and job openings.</p>

          <button className="border border-green-400 px-6 py-2.5 cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-200">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

