import React, { useState, useEffect } from "react";

//---------------- custom hook to verify user rol--------------------//
export const useVerifyUserRole = (user, roleToVerify) => {
    
    return user?.roles?.some((role) => role?.name === roleToVerify);
}
