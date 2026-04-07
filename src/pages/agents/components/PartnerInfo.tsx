const PartnerInfo = ({
  partnerId,
  email,
  phoneNumber,
}: {
  partnerId: string;
  email: string;
  phoneNumber: string;
}) => {
  return (
    <div className="bg-white shadow-md p-5 rounded-md space-y-5 col-span-1 border ">
      <h1 className="text-lg font-medium mb-3">Partner Information</h1>
      <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground">Partner Id :</p>
        <p className="font-medium">{partnerId}</p>
      </div>
      <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground">Email :</p>
        <p className="font-medium">{email}</p>
      </div>
      <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground">Phone Number :</p>
        <p className="font-medium">{phoneNumber}</p>

      </div>
    </div>
  );
};

export default PartnerInfo;
