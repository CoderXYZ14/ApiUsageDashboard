import { Schema, model, models } from "mongoose";

const ApiStatSchema = new Schema(
  {
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    totalRequests: {
      type: Number,
      required: true,
      min: 0,
    },
    successfulRequests: {
      type: Number,
      required: true,
      min: 0,
    },
    failedRequests: {
      type: Number,
      required: true,
      min: 0,
    },
    errorRate: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);
ApiStatSchema.index({ brandId: 1, date: 1 });

export default models.ApiStat || model("ApiStat", ApiStatSchema);
