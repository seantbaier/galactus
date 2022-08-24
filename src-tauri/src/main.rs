#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use ::std::process;

#[tauri::command]
fn list_graphql_apis() -> String {
    let command = "aws appsync list-graphql-apis";
    let output = if cfg!(target_os = "windows") {
        process::Command::new("cmd")
            .args(["/C", command])
            .output()
            .expect("Docker version 20.10.14, build a224086")
    } else {
        process::Command::new("sh")
            .arg("-c")
            .arg(command)
            .output()
            .expect("Docker version 20.10.14, build a224086")
    };

    // let error = String::from_utf8(output.stderr).unwrap();
    let success = String::from_utf8(output.stdout).unwrap();
    success
}

#[tauri::command]
fn docker_is_installed() -> String {
    let output = if cfg!(target_os = "windows") {
        process::Command::new("cmd")
            .args(["/C", "docker --version"])
            .output()
            .expect("Docker version 20.10.14, build a224086")
    } else {
        process::Command::new("sh")
            .arg("-c")
            .arg("docker --version")
            .output()
            .expect("Docker version 20.10.14, build a224086")
    };

    // let error = String::from_utf8(output.stderr).unwrap();
    let success = String::from_utf8(output.stdout).unwrap();
    success
}

#[tauri::command]
fn localstack_is_installed() -> String {
    let output = if cfg!(target_os = "windows") {
        process::Command::new("cmd")
            .args(["/C", "localstack --version"])
            .output()
            .expect("0.14.4")
    } else {
        process::Command::new("sh")
            .arg("-c")
            .arg("localstack --version")
            .output()
            .expect("0.14.4")
    };

    // let error = String::from_utf8(output.stderr).unwrap();
    let success = String::from_utf8(output.stdout).unwrap();
    success
}

#[tauri::command]
fn start_localstack() -> String {
    // TODO run this command instead?
    // docker run --env-file ./.env.localstack \
    // --rm -d -p 4566:4566 -p 4510-4559:4510-4559 \
    // --name localstack localstack/localstack
    let command = "docker-compose up --build -d";
    let success_msg = "Creating localstack_main ...";

    let output = if cfg!(target_os = "windows") {
        process::Command::new("cmd")
            .args(["/C", command])
            .output()
            .expect(success_msg)
    } else {
        process::Command::new("sh")
            .arg("-c")
            .arg(command)
            .output()
            .expect(success_msg)
    };

    // let error = String::from_utf8(output.stderr).unwrap();
    let success = String::from_utf8(output.stdout).unwrap();
    success
}

#[tauri::command]
fn stop_localstack() -> String {
    let command = "docker-compose down";
    let success_msg = "Stopping localstack_main ... done";

    let output = if cfg!(target_os = "windows") {
        process::Command::new("cmd")
            .args(["/C", command])
            .output()
            .expect(success_msg)
    } else {
        process::Command::new("sh")
            .arg("-c")
            .arg(command)
            .output()
            .expect(success_msg)
    };

    // let error = String::from_utf8(output.stderr).unwrap();
    let success = String::from_utf8(output.stdout).unwrap();
    success
}

fn main() {
    docker_is_installed();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            docker_is_installed,
            localstack_is_installed,
            start_localstack,
            stop_localstack,
            list_graphql_apis
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
