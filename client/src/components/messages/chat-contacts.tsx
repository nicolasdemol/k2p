import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

const ROLE_NAME = [
  { value: "prod", label: "Production" },
  { value: "quality", label: "Qualité" },
  { value: "admin", label: "Administrateur" },
];
const getRoleLabel = (value) => {
  const role = ROLE_NAME.find((role) => role.value === value);
  return role ? role.label : "Inconnu";
};

const Contacts = ({ contacts, changeChat }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div
      style={{ gridTemplateRows: "10% 90%" }}
      className="grid border-r-2 shadow-xl border-gray-50 h-full rounded-r-xl"
    >
      <div className="flex items-center justify-between p-6">
        <h2 className=" text-2xl font-semibold">Messages</h2>
        <IoAddOutline
          size={36}
          className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
        />
      </div>
      <ul className="flex flex-col items-center divide-y divide-gray-200">
        {contacts.map((contact, index) => {
          return (
            <li
              key={contact._id}
              className={`cursor-pointer px-6 py-4 flex w-full hover:bg-gray-50 ${
                index === currentSelected ? "bg-gray-100" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className=" font-medium text-gray-900 truncate ">
                    {contact.firstname} {contact.surname}
                  </p>
                  <p className="text-sm text-gray-500 truncate ">
                    {getRoleLabel(contact.role)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { Contacts };
