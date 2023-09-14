import { User, useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";
import * as React from "react";
import { IoAddOutline } from "react-icons/io5";

const ROLE_NAME = [
  { value: "prod", label: "Production" },
  { value: "quality", label: "Qualité" },
  { value: "admin", label: "Administrateur" },
];
const getRoleLabel = (value: string) => {
  const role = ROLE_NAME.find((role) => role.value === value);
  return role ? role.label : "Inconnu";
};

const Contacts = ({ changeChat }) => {
  const { user } = useAuth();
  const [contacts, setContacts] = React.useState<User[]>([]);
  const [currentSelected, setCurrentSelected] = React.useState(undefined);

  React.useEffect(() => {
    const fetchAllUsers = async () => {
      await api.getAllUsers().then((res) => {
        setContacts(res.users);
      });
    };
    if (user) {
      fetchAllUsers();
    }
  }, [user]);

  const changeCurrentChat = (index, contact: User) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div className="flex flex-col shadow-xl h-full rounded-r-xl overflow-hidden">
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>
      <ul className="flex flex-col items-center divide-y divide-gray-200">
        {contacts
          .filter((contact) => contact._id !== user._id)
          .map((contact, index) => (
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
          ))}
      </ul>
    </div>
  );
};

export { Contacts };
