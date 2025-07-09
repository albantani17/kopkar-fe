import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useLogin from "./useLogin";
import { FaEye } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";

const Login = () => {
  const {
    control,
    handleSubmit,
    errors,
    toggleVisibility,
    isVisible,
    handleLogin,
    isPendingLogin,
  } = useLogin();
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-96 bg-[#fafbfd]" shadow="lg" isFooterBlurred>
        <form onSubmit={handleSubmit(handleLogin)}>
          <CardBody>
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <div className="flex flex-col gap-6">
              <Controller
                name="nik"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    type="text"
                    label="NIK"
                    errorMessage={errors.nik?.message}
                    isInvalid={!!errors.nik}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    type={isVisible ? "text" : "password"}
                    label="Password"
                    autoComplete="off"
                    errorMessage={errors.password?.message}
                    isInvalid={!!errors.password}
                    endContent={
                      <button
                        type="button"
                        className="text-sm text-default-400"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <FaEye size={20} />
                        ) : (
                          <FiEyeOff size={20} />
                        )}
                      </button>
                    }
                  />
                )}
              />
            </div>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              className="text-lg"
              fullWidth
              color="primary"
              disabled={isPendingLogin}
            >
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
