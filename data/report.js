import mongoose from "../database.js";

const ReportSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video_url: { type: String, unique: true, required: true },
    cam_name: { type: String, required: true },
    status: { type: Number, required: true },
    tel: { type: String, required: true },
  },
  {
    versionKey: false, // `_v` 필드 비활성화
    timestamps: true, // `createdAt`, `updatedAt` 자동 추가
  }
);

const Report = mongoose.model("Report", ReportSchema);

// CRUD 기능
export const createReport = async (data) => await Report.create(data);
export const getReports = async () => await Report.find().populate("user_id");
export const getReportById = async (id) => await Report.findById(id);
export const updateReport = async (id, data) =>
  await Report.findByIdAndUpdate(id, data, { new: true });
export const deleteReport = async (id) => await Report.findByIdAndDelete(id);

export default Report;
