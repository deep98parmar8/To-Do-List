window.onload = function() {

	//variables
	var form = document.getElementById("form");
	var input = document.getElementById("input");
	var btn = document.getElementById("btn");
	var list = document.getElementById("list");
	var btnClr = document.getElementById("btnClr");
	var id = 1;

	// listItem = {item: "todo item", checked: flase}
	var liItem = "";
	var todoList = [];

	//buttton event lsitner
	btn.addEventListener("click", addTodoItem);

	//list event listener
	list.addEventListener("click", boxChecked);

	//event listener for clear list
	btnClr.addEventListener("click", clearList);

//Creating a statement to hide clear button until input is submitted
	if(localStorage.length <= 0) {
		btnClr.style.display = "none";
		console.log("button-200390761");
	}


	function playSound() {
           var sound = document.getElementById("audio");
           sound.play();
       }




	//Creatign an alert funnction to ensure user has inputted a value
	function addTodoItem() {
		if(input.value === "") {
			alert("Create something To Do");
		}
		else {
			if(list.style.borderTop === "") {
				console.log("Test-200390761")
				list.style.borderTop = "2px solid white";
				btnClr.style.display = "inline";
			}
			var text = input.value;
			var item = `<li id="li-${id}">${text}<input id="box-${id}" 			class="checkboxes" type="checkbox"></li>`;
			list.insertAdjacentHTML('beforeend', item);
			liItem = {item: text, checked: false};
			todoList.push(liItem);
			id++;
			addToLocalStorage()
			form.reset();
		}
	}

	//adding string through style to list items
	function boxChecked(event) {
		const element = event.target;
		if(element.type === "checkbox") {
			element.parentNode.style.textDecoration = "line-through";
			todoList = JSON.parse(localStorage.getItem("todoList"));
			todoList[element.id.split('-')[1]-1].checked = element.checked.toString(null);
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
	}

	//adding data to local storage
	function addToLocalStorage() {
		if(typeof(Storage) !== "undefined") {
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
		else {
			alert("local storage unavailable");
		}
	}

	//display all todo list
	function displayList() {
		list.style.borderTop = "4px solid white";
		todoList = JSON.parse(localStorage.getItem("todoList"));
		todoList.forEach(function(element) {
			console.log(element.item)
			var text = element.item;
			var item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;
			list.insertAdjacentHTML("beforeend", item);

			//if we got a checked box, then style
			if(element.checked) {
				var li = document.getElementById("li-"+id);
				li.style.textDecoration = "line-through";
				li.childNodes[1].checked = element.checked;
			}
			id++;
		});
	}

	//clear list event listener
	function clearList() {
		todoList = [];
		localStorage.clear();
		list.innerHTML = "";
		btnClr.style.display = "none";
		list.style.borderTop = "";
	}
}
