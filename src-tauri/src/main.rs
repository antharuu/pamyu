// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
async fn save(version: String, value: i32) -> bool {
    println!("The version is {} and the value is {}", version, value);

    use std::fs::OpenOptions;
    use std::io::Write;
    use std::path::Path;

    let path = Path::new("data/save.json");
    let display = path.display();

    let mut file = match OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(&path)
    {
        Err(why) => panic!("Couldn't open {}: {}", display, why.to_string()),
        Ok(file) => file,
    };

    if !path.exists() {
        match file.write_all(b"{}") {
            Err(why) => panic!("Couldn't write to {}: {}", display, why.to_string()),
            Ok(_) => println!("Successfully wrote to {}", display),
        };
    }

    false
}

#[tauri::command]
async fn list_res(path: String) -> Result<Vec<String>, String> {
    use std::fs;

    match fs::read_dir(path) {
        Ok(entries) => {
            let mut files = Vec::new();
            for entry in entries {
                match entry {
                    Ok(entry) => match entry.file_name().to_str() {
                        Some(file_name) => {
                            files.push(file_name.to_owned());
                        }
                        None => {
                            return Err(format!("Invalid UTF-8 sequence in file name"));
                        }
                    },
                    Err(error) => {
                        return Err(error.to_string());
                    }
                }
            }
            Ok(files)
        }
        Err(error) => Err(error.to_string()),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save])
        .invoke_handler(tauri::generate_handler![list_res])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
