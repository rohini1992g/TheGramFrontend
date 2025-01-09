import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Messages = ({ selectedUser }) => {
  return (
    <div className="overflow-y-auto flex-l p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar>
            <AvatarImage
              src={selectedUser?.profilePicture}
              alt="profilepicture"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}hi</span>
        </div>
      </div>
    </div>
  );
};
export default Messages;
