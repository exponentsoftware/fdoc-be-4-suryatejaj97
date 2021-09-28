const Todo = require("../Models/Todo");
exports.addtodo = async (req, res) => {
  const { userId, username, title, category, status = false } = req.body;
  const todo = new Todo({
    username,
    title,
    category,
    userId,
    status,
  });

  todo.save((error, todo) => {
    if (error) {
      return res.status(400).json({
        message: "bad reqest data not added",
      });
    }

    if (todo) {
      return res.status(201).json({
        message: "Successfully addded a Todo",
        todo,
      });
    }
  });
};

exports.getalltodoByUserId = async (req, res) => {
  try {
    console.log("get fraom ejs id", req.params._id);
  } catch (err) {
  
    res.status(404).json({ success: false, message: "data not found", err });
  }
};

exports.getalltodo = async (req, res) => {
  try {
    console.log("get fraom ejs id", req.params._id);
    let userId = req.user._id; 
    let key = [];
    for (let k in req.query) {
      key.push(k);
    }
    if (key.length == 0) {
      console.log("should have no query string", req.user._id);
      const todo = await Todo.find({ userId: userId }).sort({ createdAt: -1 });

      if (todo.length == 0) {
        res.status(404).json({
          success: false,
          message: `Not Found any Todo Data`,
          todo,
        });
      } else {
        res.render("userHome", {
          success: true,
          message: "All Todo",
          todo: todo,
        });
      }
    } else {
      let firstKey = key[0];

      if (key.length == 1) {
        firstKey == "true" ? (firstKey = true) : "";
        req.query[key][0] == "false" ? (req.query[key][0] = false) : "";


        const response = await Todo.find(req.query).sort({
          createdAt: -1,
        });
        if (response.length <= 0) {
          res.status(404).json({
            success: false,
            message: `Not Found ${key} of Todo`,
            todo: response,
          });
        }
        res.status(200).json({
          success: true,
          message: `All ${key} of Todo`,
          todo: response,
        });
      } else {
        res.status(400).json({ success: false, message: "Add only One key" });
      }
    }
  } catch (err) {
    res.status(404).json({ success: false, message: "data not found", err });
  }
};


exports.gettodoById = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    const todo = await Todo.findById({ _id: id });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: `Todo Not found this id:${id}`,
      });
    }

    res.status(200).json({ success: true, todo });
  } catch (err) {
    // console.log(err);
    res.status(404).json({ success: false, message: "data not found", err });
  }
};

exports.updatetodo = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);

    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    });

    if (!todo) {
      res.status(402).json({
        success: false,
        message: `Todo  unsuccessful update this id:${id}`,
      });
    }

    res.status(200).json({ success: true, message: todo });
  } catch (err) {
    // console.log(err);
    res.status(402).json({
      success: false,
      message: `Todo  unsuccessful update this id:${id}`,
      err,
    });
  }
};

exports.deletetodo = async (req, res) => {
  try {
    let id = req.params.id;
    const todo = await Todo.findOneAndDelete({ _id: id });
    console.log(todo);
    if (todo) {
      res.status(201).json({ success: true, message: "Todo removed" });
    } else {
      res.status(204).json({ success: false, message: "not deleted todo" });
    }
  } catch (err) {
    res.status(204).json({ success: false, message: "not deleted todo", err });
  }
};

