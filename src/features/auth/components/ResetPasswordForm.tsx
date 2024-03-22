import { logo } from "@data/index";
import { AuthenticationPages, ButtonEnum } from "@ts-types/enums";
import { AuthenticationNavigation, Button, Input } from "@ui/index";

const ResetPasswordForm = () => {
  return (
    <div className=" flex flex-1 flex-col gap-2 bg-white px-14 py-16">
      <img className="h-24 w-24" src={logo} alt="" />
      <h1 className="text-2xl font-bold uppercase">LET'S GET YOU BACK</h1>
      <p className="text-gray-400">
        We'll send you a link to reset your password
      </p>
      <form onSubmit={() => {}}>
        <Input id="email" label="Email Address" type="email" />
        <Button
          className="mt-6 hover:bg-gradient-to-t hover:from-green-500 hover:to-green-800 "
          type={ButtonEnum.Primary}
        >
          VERIFY NOW
        </Button>
      </form>
      <AuthenticationNavigation page={AuthenticationPages.Reset_Password} />
    </div>
  );
};

export default ResetPasswordForm;
