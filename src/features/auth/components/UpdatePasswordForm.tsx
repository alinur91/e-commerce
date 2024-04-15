import { Button, Input } from "@ui/index";
import { useForm } from "react-hook-form";
import {
  TUpdatePasswordSchema,
  updatePasswordSchema,
} from "@features/auth/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { ButtonEnum } from "@ts-types/enums";
import { updatePassword } from "@features/auth/api/index";
import { selectAuthData } from "@features/auth/slices/selector";
import { ClipLoader } from "@utils/icons";

const UpdatePasswordForm = () => {
  const dispatch = useAppDispatch();
  const {
    updatePasswordActions: { updatePasswordLoading },
  } = useAppSelector(selectAuthData);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async ({ password }: TUpdatePasswordSchema) => {
    dispatch(updatePassword(password));
  };

  return (
    <div className="mt-10 w-[400px] space-y-5 rounded-lg border-[1.5px] border-solid border-gray-200 p-8">
      <h1 className="text-xl font-bold">UPDATE PASSWORD</h1>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          inputClassName="mt-1 h-12"
          errors={errors.password && errors.password.message}
          {...register("password")}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Re-Enter Password"
          inputClassName="mt-1 h-12"
          errors={errors.confirmPassword && errors.confirmPassword.message}
          {...register("confirmPassword")}
        />
        <Button
          className="h-12 w-full gap-3 disabled:bg-gray-200 disabled:text-gray-400"
          disabled={isSubmitting || updatePasswordLoading}
          type={ButtonEnum.PRIMARY}
        >
          {updatePasswordLoading ? "Updating password..." : "Update password"}{" "}
          {updatePasswordLoading && <ClipLoader color="#915c0d" size={24} />}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
