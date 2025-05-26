import mongoose,{Schema,Document,Model, mongo} from "mongoose";

interface IReviews extends Document{
    rating:number,
    rating_Message:string,
    date_rating:string,
    userId:mongoose.Schema.Types.ObjectId,
    bookId:mongoose.Schema.Types.ObjectId,
    createdAt?: Date;
  updatedAt?: Date;
}

const ReviewsSchema:Schema = new Schema({
    rating:Number,
    rating_Message:String,
    date_rating:String,
    userId:{type:Schema.Types.ObjectId,ref:"User",require:true},
    bookId:{type:Schema.Types.ObjectId,ref:"Books",require:true},
},{
  timestamps: true  // 👈 this adds createdAt and updatedAt
})

const ReviewsModel:Model<IReviews> = mongoose.model<IReviews>("Reviews",ReviewsSchema);
export default ReviewsModel;