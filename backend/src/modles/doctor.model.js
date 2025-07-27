import mongoose from "mongoose";
import bcrypt from "bcrypt";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required!"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Entered email is alredy exist!"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: 8,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required!"],
    },
    speciality: {
      type: String,
      required: [true, "Doctor speciality is required!"],
      lowercase: true,
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Doctor degree is required!"],
      lowercase: true,
      trim: true,
    },
    experience: {
      type: String,
      required: [true, "Doctor experience is required!"],
      lowercase: true,
      trim: true,
    },
    about: {
      type: String,
      required: [true, "Doctor about is required!"],
      lowercase: true,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    fees: {
      type: Number,
      required: [true, "Doctor fees is required!"],
    },
    address: {
      type: String,
      required: [true, "Doctor address is required!"],
      lowercase: true,
      trim: true,
    },
    slotsBooked: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

doctorSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    console.log("Password hashing error:", error.massage);
  }
});

doctorSchema.methods.isPasswordCorrect = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log("Password compare error:", error.massage);
  }
};

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
export default Doctor;
