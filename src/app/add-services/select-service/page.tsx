import sheetIcon from "@/assets/service-icons/google-sheets-icon.svg";
import Card from "@/components/shared/cards/serviceCard";
import tagmangoicon from "@/assets/service-icons/tagmango-icon.svg"
export default function Page() {
  return (
    <>
      <div className="grid place-items-center p-4">
        <div className="lg:grd-cols-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
          <h1 className="col-span-full  mb-2 text-2xl font-bold">
            Select The service you want
          </h1>
          {/*

            <div className="col-span-full">Normal Service</div>
          */}
          <Card
            imgSrc={sheetIcon}
            href={"/add-services/google-sheets"}
            title="Google Sheet"
            discription="Auth with Google Sheet"
          />
          <div className="col-span-full mt-4 ">Premium Service</div>
          <Card
            imgSrc={tagmangoicon}
            href={"/add-services/add-bot-for-tm/select-roles"}
            title="Tagmango"
            discription="Connect With Tag Manog"
          />
        </div>
      </div>
    </>
  );
}
