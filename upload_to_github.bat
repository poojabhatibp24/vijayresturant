@echo off
title Upload Vijay Restaurant to GitHub
cd /d "c:\Users\HP\Desktop\vijayresturant"
echo ========================================================
echo  Uploading Vijay Restaurant to GitHub:
echo  https://github.com/poojabhatibp24/vijayresturant.git
echo ========================================================
echo.
"C:\Users\HP\.mingit\cmd\git.exe" push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Your repository has been uploaded to GitHub!
    echo Visit: https://github.com/poojabhatibp24/vijayresturant
) else (
    echo [NOTE] If you were prompted for credentials, please sign in with GitHub or enter your GitHub Personal Access Token.
)
echo.
pause
