function validAdder() {
  document.querySelector("#adder__btn").disabled = !(
    document.querySelector("#card__task-title").value &&
    document.querySelector("#applied-tag")
  );
}

function getColor(priority) {
  switch (priority) {
    case "high":
      return "#ff5f37";
    case "mid":
      return "#ffaf37";
    case "low":
      return "#11a483";
    default:
      throw new Error("Unknown tag");
  }
}

function createTag(priority) {
  let textColor, bgColor, text;
  switch (priority) {
    case "high":
      textColor = "text-orange";
      bgColor = "bg-light-orange";
      text = "بالا";
      break;
    case "mid":
      textColor = "text-yellow";
      bgColor = "bg-light-yellow";
      text = "متوسط";
      break;
    case "low":
      textColor = "text-green";
      bgColor = "bg-light-green";
      text = "پایین";
      break;
    default:
      throw new Error("Unknown tag");
  }
  const tag = document.createElement("span");
  tag.textContent = text;
  tag.dataset["priority"] = priority;
  tag.classList.add(
    textColor,
    bgColor,
    "rounded-md",
    "text-center",
    "cursor-pointer",
    "py-1",
    "px-2",
    "hover:opacity-70",
    "m-2",
  );
  return tag;
}
function createAppliedTag(priority) {
  const appliedTag = createTag(priority);
  appliedTag.id = "applied-tag";
  appliedTag.classList.add("flex", "gap-2", "items-center");
  appliedTag.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L8 8M8 8L12 12M8 8L12 4M8 8L4 12" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
 ${appliedTag.textContent}`;
  appliedTag.addEventListener("click", () => {
    appliedTag.parentElement.querySelector("label").classList.toggle("hidden");
    appliedTag.remove();
  });
  appliedTag.classList.add("font-semibold", "text-xs");
  return appliedTag;
}
function createTagList(...priorities) {
  const tagList = document.createElement("ul");
  tagList.id = "tag-list";
  tagList.classList.add(
    "flex",
    "items-center",
    "rounded-md",
    "border",
    "border-gray-E9",
    "dark:bg-[#0B192D]",
    "dark:border-[#293242]",
    "py-1",
    "px-2",
    "text-xs",
    "font-bold",
    "shadow-md",
  );
  for (const priority of priorities) {
    const wrapper = document.createElement("li");
    wrapper.classList.add(
      "border-l",
      "border-gray-E9",
      "dark:border-[#293242]",
    );

    wrapper.appendChild(createTag(priority));
    tagList.appendChild(wrapper);
  }
  tagList.lastElementChild.classList.remove("border-l");
  tagList.addEventListener("click", (ev) => {
    if (ev.target instanceof HTMLSpanElement) {
      tagList.previousElementSibling.click();
      tagList.previousElementSibling.classList.toggle("hidden");
      tagList.parentElement.appendChild(
        createAppliedTag(ev.target.dataset.priority),
      );
      validAdder();
    }
  });
  return tagList;
}
function createTagCheckbox() {
  const tagsCheckbox = document.createElement("label");
  tagsCheckbox.classList.add(
    "rounded-md",
    "px-2",
    "py-1",
    "flex",
    "items-center",
    "gap-1",
    "border",
    "border-gray-E9",
    "dark:border-[#83878F]",
    "cursor-pointer",
    "hover:opacity-70",
  );
  tagsCheckbox.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.81407 2.06665H10.4407C10.8941 2.06665 11.4607 2.37998 11.7007 2.76665L14.4874 7.21998C14.7541 7.65332 14.7274 8.33332 14.4208 8.73998L10.9674 13.34C10.7208 13.6667 10.1874 13.9333 9.78075 13.9333H2.81407C1.6474 13.9333 0.940768 12.6533 1.5541 11.66L3.40074 8.70665C3.64741 8.31332 3.64741 7.67332 3.40074 7.27998L1.5541 4.32665C0.940768 3.34665 1.65407 2.06665 2.81407 2.06665Z" stroke="#AFAEB2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
  const sp = document.createElement("span");
  sp.style.backgroundColor;
  sp.textContent = "تگ ها";
  sp.classList.add("text-gray-AF");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.classList.add("hidden");
  tagsCheckbox.append(sp, input);
  tagsCheckbox.addEventListener("click", () => {
    document
      .querySelector("ul#tag-list")
      .classList.toggle("hidden", !tagsCheckbox.lastElementChild.checked);
    tagsCheckbox.innerHTML = tagsCheckbox.lastElementChild.checked
      ? `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.9336 2.81328V10.4399C13.9336 10.8933 13.6203 11.46 13.2336 11.7L8.78026 14.4866C8.34693 14.7533 7.66693 14.7266 7.26026 14.42L2.66026 10.9666C2.33359 10.72 2.06693 10.1866 2.06693 9.77995V2.81328C2.06693 1.64661 3.34693 0.939975 4.34026 1.55331L7.29359 3.39995C7.68693 3.64661 8.32693 3.64661 8.72026 3.39995L11.6736 1.55331C12.6536 0.939975 13.9336 1.65328 13.9336 2.81328Z" fill="#AFAEB2" stroke="#AFAEB2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
      : `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.81407 2.06665H10.4407C10.8941 2.06665 11.4607 2.37998 11.7007 2.76665L14.4874 7.21998C14.7541 7.65332 14.7274 8.33332 14.4208 8.73998L10.9674 13.34C10.7208 13.6667 10.1874 13.9333 9.78075 13.9333H2.81407C1.6474 13.9333 0.940768 12.6533 1.5541 11.66L3.40074 8.70665C3.64741 8.31332 3.64741 7.67332 3.40074 7.27998L1.5541 4.32665C0.940768 3.34665 1.65407 2.06665 2.81407 2.06665Z" stroke="#AFAEB2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    tagsCheckbox.append(sp, input);
  });
  return tagsCheckbox;
}

function createCancel() {
  const cancel = document.createElement("button");
  cancel.classList.add(
    "bg-gray-F7",
    "dark:bg-[#0C1B31]",
    "px-2",
    "rounded-md",
    "hover:opacity-80",
    "cursor-pointer",
  );
  cancel.innerHTML = `                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.5 5.5L11 11M11 11L16.5 16.5M11 11L16.5 5.5M11 11L5.5 16.5"
                      stroke="#9E9E9E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>`;
  cancel.addEventListener("click", () => {
    const taskAdderBtn = document.querySelector("#task-adder-btn");
    const count = document.querySelector("#today-tasks-count").dataset.count;

    taskAdderBtn.classList.toggle("hidden");
    document.querySelector("#empty-state").classList.toggle("hidden", count);
    cancel.parentElement.parentElement.remove();
  });
  return cancel;
}
function createTaskAdder() {
  const adder = document.createElement("button");
  adder.id = "adder__btn";
  adder.disabled = true;
  adder.classList.add(
    "dark:bg-(--color-blue-addtask)",
    "bg-blue",
    "text-white",
    "px-4",
    "py-1.5",
    "rounded-md",
    "disabled:opacity-60",
    "hover:opacity-80",
    "transition-colors",
    "duration-300",
    "cursor-pointer",
  );
  adder.textContent = "اضافه کردن تسک";
  adder.addEventListener("click", (ev) => {
    const taskCard = ev.currentTarget.parentElement.parentElement;
    try {
      const title = document.getElementById("card__task-title").value.trim();
      const desc = document.getElementById("card__task-desc").value.trim();
      const priority = taskCard.firstChild.querySelector(".flex[data-priority]")
        .dataset.priority;
      const taskObject = {
        title,
        desc,
        priority,
        done: false,
      };

      taskCard.remove();
      document.getElementById("task-adder-btn").classList.toggle("hidden");
      taskCard.after(createTask(taskObject));
    } catch (e) {
      console.log(e);
    }
  });
  return adder;
}

function taskCard(taskObject) {
  const card = document.createElement("div");
  card.classList.add(
    "rounded-md",
    "border",
    "border-gray-E9",
    "bg(--color-background-light)",
    "dark:bg-background-dark",
    "dark:border-[#3D3D3D]",
    "shadow-lg",
  );
  const taskDetails = document.createElement("div");
  taskDetails.classList.add(
    "flex",
    "flex-col",
    "items-start",
    "gap-3",
    "border-b",
    "border-gray-E9",
    "dark:border-[#3D3D3D]",
    "p-4",
  );
  const taskTitle = document.createElement("input");
  taskTitle.id = "card__task-title";
  taskTitle.type = "text";
  taskTitle.maxLength = 100;
  taskTitle.placeholder = "نام تسک";
  taskTitle.classList.add(
    "font-semibold",
    "flex-1",
    "placeholder:text-gray-7D",
    "dark:placeholder:text-(--color-white)",
    "w-full",
    "focus:outline-none",
  );

  const taskDesc = document.createElement("textarea");
  taskDesc.id = "card__task-desc";

  taskDesc.maxLength = 300;
  taskDesc.placeholder = "توضیحات";
  taskDesc.cols = 2;
  taskDesc.classList.add(
    "text-xs",
    "resize-none",
    "flex-1",
    "placeholder:text-gray-AF",
    "w-full",
    "focus:outline-none",
  );
  const tagsCheckbox = createTagCheckbox();
  tagsCheckbox.classList.add("hidden");
  const tagList = createTagList("low", "mid", "high");
  tagList.classList.add("hidden");
  taskDetails.append(taskTitle, taskDesc, tagsCheckbox, tagList);
  const controls = document.createElement("div");
  controls.classList.add("py-4", "flex", "justify-end", "gap-2", "px-4");
  const adder = createTaskAdder();

  controls.appendChild(adder);
  if (taskObject) {
    taskTitle.value = taskObject.title;
    taskDesc.value = taskObject.desc || "";
    const appliedTag = createAppliedTag(taskObject.priority);
    taskDetails.appendChild(appliedTag);
  } else {
    tagsCheckbox.classList.remove("hidden");

    adder.before(createCancel());
  }
  card.append(taskDetails, controls);
  taskTitle.addEventListener("input", validAdder);

  return card;
}

export function taskAdder() {
  const adderBtn = document.getElementById("task-adder-btn");
  adderBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    adderBtn.classList.add("hidden");
    document.querySelector("#empty-state").classList.add("hidden");
    const header = document.querySelector("main header");
    header.after(taskCard(null));
  });
}
function getTask(task) {
  const taskObject = {};
  console.log(task);

  const details = task.querySelectorAll("span");
  taskObject.title = details[0].textContent;
  taskObject.desc = details[2].textContent;
  taskObject.priority = task.querySelector("[data-priority]").dataset.priority;
  taskObject.done = false;
  return taskObject;
}
function createTaskOptions() {
  const wrapper = document.createElement("div");
  wrapper.classList.add(
    "flex",
    "shadow-md",
    "rounded-md",
    "border",
    "border-gray-E9",
    "dark:border-white",
    "dark:text-white",
    "absolute",
    "top-full",
    "left-full",
    "p-1",
    "bg-white",
    "dark:bg-[#0d1120]",
  );
  wrapper.innerHTML = `<div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" stroke="#5C5F61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z" stroke="#5C5F61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>
<div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 7H20M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7M10 12L14 16M14 12L10 16" stroke="#5C5F61" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>
`;

  wrapper.firstElementChild.classList.add(
    "flex",
    "justify-center",
    "hover:opacity-80",
    "pl-2",
    "border-l",
    "border-gray-E9",
    "dark:border-white",
  );
  wrapper.lastElementChild.classList.add(
    "flex",
    "justify-center",
    "hover:opacity-80",
    "mr-2",
  );
  wrapper.firstElementChild.addEventListener("click", (ev) => {
    const task = ev.currentTarget.parentElement.parentElement.parentElement;
    task.after(taskCard(getTask(task)));
    task.remove();
  });
  console.log(wrapper);
  wrapper.addEventListener("mou", () => {
    wrapper.remove();
  });
  // write delete function for firstelementchild
  return wrapper;
}

function createMoreBtn() {
  const moreBtn = document.createElement("button");
  moreBtn.classList.add(
    "relative",
    "text-gray-52",
    "cursor-pointer",
    "hover:opacity-80",
    "overflow-visible",
  );
  moreBtn.textContent = "⋮";
  moreBtn.addEventListener("click", () => {
    const options = createTaskOptions();
    moreBtn.appendChild(options);
  });
  return moreBtn;
}

function createTask(taskObject) {
  const task = document.createElement("li");
  console.log(getColor(taskObject.priority));

  task.classList.add(
    "relative",
    "overflow-visible",
    "flex",
    "items-center",
    "justify-start",
    "overflow-hidden",
    "rounded-xl",
    "border",
    "border-gray-200",
    "bg-white",
    "py-4",
    "pr-5",
    "pl-4",
    "shadow-sm",
    "dark:border-[#1a2238]",
    "dark:bg-[#0d1120]",
    "dark:shadow-[0_4px_8px_rgba(0,0,0,0.25)]",
  );
  const after = document.createElement("div");
  after.classList.add(
    "w-1",
    "absolute",
    "inset-y-0",
    "right-0",
    "h-8/12",
    "rounded-l-md",
    "translate-y-3/12",
  );
  after.style.backgroundColor = getColor(taskObject.priority);
  const label = document.createElement("label");
  label.classList.add(
    "flex",
    "min-w-0",
    "flex-1",
    "cursor-pointer",
    "items-center",
    "gap-3",
  );
  const input = document.createElement("input");
  input.type = "checkbox";
  input.classList.add(
    "peer",
    "size-4.5",
    "shrink-0",
    "cursor-pointer",
    "accent-[#3b82f6]",
  );
  const taskDetails = document.createElement("div");
  taskDetails.classList.add("flex", "flex-col", "gap-1", "items-start");
  const title = document.createElement("span");
  title.classList.add(
    "min-w-0",
    "wrap-break-word",
    "peer-checked:text-gray-7D",
    "peer-checked:line-through",
    "dark:peer-checked:text-[#d1d1d5]",
    "font-semibold",
  );
  title.textContent = taskObject.title;
  const tag = createTag(taskObject.priority);
  tag.classList.remove("m-2");
  tag.classList.add("text-xs", "font-semibold");
  const desc = document.createElement("span");
  desc.classList.add(
    "min-w-0",
    "wrap-break-word",
    "text-xs",
    "font-medium",
    "peer-checked:text-gray-7D",
    "peer-checked:line-through",
    "dark:peer-checked:text-[#d1d1d5]",
    "text-gray-7D",
  );
  desc.textContent = taskObject.desc;

  taskDetails.append(title, tag, desc);
  label.append(input, taskDetails);

  const moreBtn = createMoreBtn();
  task.append(label, moreBtn, after);
  document.querySelector("#today-tasks").appendChild(task);
}
