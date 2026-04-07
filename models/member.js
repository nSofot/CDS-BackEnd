import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      enum: ["Mr.", "Mrs.", "Miss.", "Dr.", "Prof."],
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    nameInSinhala: { 
      type: String, 
      trim: true 
    },

    address: [{ type: String, trim: true }],

    mobile: {
      type: String,
      sparse: true,
      trim: true,
    },

    phone: String,

    email: {
      type: String,
      lowercase: true,
      sparse: true,
      trim: true,
    },

    image: [{ type: String }],

    joinDate: {
      type: Date,
      default: Date.now,
    },

    notes: String,

    memberRole: {
      type: String,
      enum: [
        "admin",
        "member",
        "president",
        "secretary",
        "treasurer",
        "vice-president",
        "assistant-secretary",
        "assistant-treasurer",
        "internal-auditor",
      ],
      default: "member",
    },

    dueAmount: {
      type: Number,
      default: 0,
    },

    password: {
      type: String,
      select: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);
export default Member;
