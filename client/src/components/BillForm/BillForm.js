import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_BILL } from "../../utils/mutations";
import { QUERY_FULL_ME, QUERY_BILLS } from "../../utils/queries";
