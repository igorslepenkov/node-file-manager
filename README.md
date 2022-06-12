# node-file-manager

Задание: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md
Дедлайн: 2022-06-12 23:59
Общий балл: 320 баллов

Самопроверка:
General -+6 Application accepts username and prints proper message -+10 Application exits if user pressed ctrl+c or sent .exit command and proper message is printed
+Приложение работает через readline, принимает имя пользователя по форме и выводит приветственное сообщение, при нажатии cntr+c либо команде .exit процесс завершается и выводится нуное сообщение

Operations fail
+20 Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail
В сучае непредвиденной ошибки во время выполнения выводит ошибку "Operation failed" при попытке вызвать функцию на несуществующем файле или директории выводит ошибку "Operation failed. File or folder doesn't exists or could not be reached from this directory"

+10 Operation fail doesn't crash application
Вывод ошибки не сопровождается выходом из программы

Navigation & working directory operations implemented properly
+10 Go upper from current directory +Работает как задумано
+10 Go to dedicated folder from current directory +Работает как задумано
+10 List all files and folders in current directory +Работает как задумано
Было несколько случаев возникновения ошибки EPERM(недостаток прав для чтения директории) к примеру с папкой "Мои документы"
при возникновении этой ошибки попробуйте другую директорию, если ошибка повторяется помогает npm cache verify (чистка кеша NPM)

Basic operations with files implemented properly
+10 Read file and print it's content in console +Работает как задумано
+10 Create empty file +Работает как задумано
+10 Rename file +Работает как задумано
+10 Copy file +Работает как задумано
+10 Move file +Работает как задумано
+10 Delete file +Работает как задумано
Operating system info (prints following information in console) implemented properly
+6 Get EOL (default system End-Of-Line) +Работает как задумано
+10 Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) +Работает как задумано
+6 Get home directory +Работает как задумано
+6 Get current system user name (Do not confuse with the username that is set when the application starts) +Работает как задумано
+6 Get CPU architecture for which Node.js binary has compiled +Работает как задумано
Hash calculation implemented properly
+20 Calculate hash for file +Работает как задумано
Compress and decompress operations
+20 Compress file (using Brotli algorithm) +Работает как задумано
+20 Decompress file (using Brotli algorithm) +Работает как задумано
Advanced Scope
+50 All files operations with reading/writing should be performed using Streams API
Все операции чтения/записи выполнены при помощи стримов

+20 Codebase is written in ESM modules instead of CommonJS
Вся кодовая база написана в ES модулях, в package.json установлен type: module

+20 Codebase is separated (at least 7 modules)
Кодовая база полностью разделена на модули (12 штук)
