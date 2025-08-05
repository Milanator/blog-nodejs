import { expect } from "chai";
import auth from "./../middlewares/auth.ts";

it("Throw error if no authorization header", () => {
  const req = {
    get: () => {
      return undefined;
    },
  };

  expect(auth.bind(this, req, {}, () => {})).to.throw("Not authenticated.");
});
