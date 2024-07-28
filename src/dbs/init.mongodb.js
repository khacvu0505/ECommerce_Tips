"use strict"; // Turn on strict mode for this file

const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");

const connectString = "mongodb://localhost:27017/shopDEV";

class Database {
  constructor() {
    this.connect();
  }

  // connect
  connect(type = "mongodb") {
    // Check dev env
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString, {
        maxPoolSize: 50, // Số lượng kết nối tối đa mà pool kết nối (connection pool) có thể giữ.
        /**
         *  một connection pool là một tập hợp các kết nối đã được thiết lập sẵn với cơ sở dữ liệu, được quản lý để tái sử dụng cho các yêu cầu mới mà không cần phải tạo kết nối mới mỗi lần. Điều này giúp cải thiện hiệu suất của ứng dụng bằng cách giảm thiểu chi phí và thời gian cần thiết để thiết lập kết nối.
         * maxPoolSize: 50: Thiết lập số lượng kết nối tối đa trong pool là 50. Điều này có nghĩa là tối đa 50 kết nối có thể được mở và sử dụng cùng một lúc. Nếu có nhiều hơn 50 yêu cầu kết nối, các yêu cầu vượt quá sẽ phải chờ cho đến khi một kết nối trong pool được giải phóng.
         */

        /**
         * Một kết nối trong pool được giải phóng (tức là trở lại pool để tái sử dụng) khi nó hoàn thành công việc hiện tại của mình. Cụ thể hơn, điều này xảy ra trong các tình huống sau:

          - Kết thúc truy vấn: Khi một truy vấn đến cơ sở dữ liệu MongoDB được thực thi xong và dữ liệu đã được trả về cho ứng dụng.
          - Kết thúc giao dịch: Khi một giao dịch (transaction) kết thúc, bao gồm cả việc commit hoặc rollback.
          - Kết thúc một thao tác CRUD: Khi các thao tác tạo, đọc, cập nhật hoặc xóa (CRUD) hoàn thành.
         */
      })
      .then(() => {
        console.log("Connected to MongoDB successfully", countConnect());
      })
      .catch((err) => {
        console.log("Error connecting to MongoDB", err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      this.Database = new Database();
      return;
    }
    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
